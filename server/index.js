import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import * as cheerio from "cheerio";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Schema for Products (to store Amazon links)
const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  brand: String,
  category: String,
  subcategory: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  rating: Number,
  reviewCount: Number,
  image: String,
  images: [String],
  description: String,
  specs: Map,
  affiliateUrl: String,
  isTrending: Boolean,
  isFlashSale: Boolean,
  flashSaleEnds: String
});

const Product = mongoose.model("Product", ProductSchema);

// Schema for Admin Configuration (if we want to store global strip links)
const ConfigSchema = new mongoose.Schema({
  key: String,
  value: String
});

const Config = mongoose.model("Config", ConfigSchema);

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }); // Newest first
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new product
app.post("/api/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Scrape Amazon Product Info
app.post("/api/scrape", async (req, res) => {
  let { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await axios.get(url, {
      maxRedirects: 10,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.google.com/',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Check if we hit a bot check (Amazon's CAPTCHA page)
    if ($('title').text() === 'Amazon.in' || $('title').text().includes('Bot Check')) {
       return res.status(503).json({ error: "Amazon blocked our request. Please add details manually for now." });
    }

    // Selectors for Amazon
    const title = $('#productTitle').text().trim() || $('meta[property="og:title"]').attr('content') || "";
    
    // Get high-res main image
    let mainImage = "";
    const imgData = $('#landingImage').attr('data-a-dynamic-image') || $('#imgBlkFront').attr('data-a-dynamic-image');
    if (imgData) {
      try {
        const urls = Object.keys(JSON.parse(imgData));
        mainImage = urls[urls.length - 1]; // Highest res
      } catch (e) {}
    }
    if (!mainImage) {
      mainImage = $('#landingImage').attr('src') || $('img.a-dynamic-image').attr('src') || $('meta[property="og:image"]').attr('content') || "";
    }

    // Get gallery images (thumbnails)
    const gallery = [mainImage];
    $('#altImages ul li img').each((i, el) => {
      let src = $(el).attr('src');
      if (src && (src.includes('images-na.ssl-images-amazon') || src.includes('.media-amazon.com'))) {
         // Transform thumbnail URL to high-res if possible (Amazon usually uses ._SS40_ or similar)
         const highRes = src.replace(/\._[A-Z0-9,_]+_\./, '.'); 
         if (highRes && !gallery.includes(highRes)) gallery.push(highRes);
      }
    });
    
    // Brand
    const brand = $('#bylineInfo').text().trim().replace(/^Visit the /, '').replace(/ Store$/, '') || "Luxury Item";

    // Price
    let priceText = $('.a-price-whole').first().text().replace(/[^0-9]/g, '');
    if (!priceText) {
      const desc = $('meta[property="og:description"]').attr('content') || "";
      priceText = desc.match(/₹([0-9,]+)/)?.[1]?.replace(/,/g, '') || "";
    }
    
    // Description / Features
    const features = [];
    $('#feature-bullets ul li span').each((i, el) => {
      const text = $(el).text().trim();
      if (text) features.push(text);
    });
    const description = features.join('\n') || $('.product-description-content').text().trim() || "";

    res.json({
      name: title,
      image: mainImage,
      images: gallery.slice(0, 5),
      price: priceText ? Number(priceText) : 2999,
      brand: brand,
      description: description
    });
  } catch (err) {
    console.error("Scrape error:", err.message);
    res.status(500).json({ error: "Could not fetch details. Amazon might be blocking this request." });
  }
});

// Update a product's Amazon link
app.put("/api/products/:id", async (req, res) => {
  try {
    const { affiliateUrl } = req.body;
    const updated = await Product.findByIdAndUpdate(req.params.id, { affiliateUrl }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update global config
app.post("/api/config", async (req, res) => {
  try {
    const { key, value } = req.body;
    await Config.findOneAndUpdate({ key }, { value }, { upsert: true });
    res.json({ message: "Config updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/config/:key", async (req, res) => {
  try {
    const config = await Config.findOne({ key: req.params.key });
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Email sending (Nodemailer)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form: ${name}`,
    text: `From: ${name} <${email}>\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
