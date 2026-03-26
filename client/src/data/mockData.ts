import { getAffiliateUrl } from "@/lib/affiliate";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  affiliateUrl: string;
  isTrending?: boolean;
  isFlashSale?: boolean;
  flashSaleEnds?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export const categories: Category[] = [
  { id: "men", name: "Men", icon: "👔", subcategories: ["Shirts", "Trousers", "Jackets", "Shoes", "Accessories"] },
  { id: "women", name: "Women", icon: "👗", subcategories: ["Dresses", "Tops", "Skirts", "Heels", "Handbags"] },
  { id: "electronics", name: "Electronics", icon: "📱", subcategories: ["Smartphones", "Laptops", "Headphones", "Cameras", "Tablets"] },
  { id: "home", name: "Home", icon: "🏠", subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting"] },
  { id: "beauty", name: "Beauty", icon: "💄", subcategories: ["Skincare", "Makeup", "Fragrance", "Haircare", "Wellness"] },
  { id: "kids", name: "Kids", icon: "🧸", subcategories: ["Boys", "Girls", "Toys", "School", "Baby Care"] },
  { id: "sports", name: "Sports", icon: "⚽", subcategories: ["Running", "Gym", "Yoga", "Cricket", "Swimming"] },
  { id: "luxury", name: "Luxury", icon: "💎", subcategories: ["Watches", "Jewellery", "Designer Wear", "Premium Bags", "Sunglasses"] },
];

export const brands = [
  { id: "1", name: "Raymond", logo: "R" },
  { id: "2", name: "Allen Solly", logo: "AS" },
  { id: "3", name: "Lakme", logo: "L" },
  { id: "4", name: "Boat", logo: "B" },
  { id: "5", name: "Puma", logo: "P" },
  { id: "6", name: "Titan", logo: "T" },
  { id: "7", name: "FabIndia", logo: "FI" },
  { id: "8", name: "Woodland", logo: "W" },
  { id: "9", name: "Biba", logo: "Bi" },
  { id: "10", name: "Noise", logo: "N" },
];

const img = (seed: string) => `https://images.unsplash.com/${seed}?w=600&h=800&fit=crop`;

export const products: Product[] = [
  {
    id: "1", name: "Premium Linen Blazer", brand: "Raymond", category: "men",
    price: 4999, originalPrice: 8999, discount: 44, rating: 4.5, reviewCount: 234,
    image: img("photo-1594938298603-c8148c4dae35"), images: [img("photo-1594938298603-c8148c4dae35"), img("photo-1507003211169-0a1dd7228f2d")],
    description: "Crafted from premium Irish linen, this blazer combines timeless elegance with modern tailoring. Perfect for both formal occasions and smart-casual outings.",
    specs: { Material: "100% Irish Linen", Fit: "Slim Fit", Pattern: "Solid", Occasion: "Formal / Smart Casual" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example1"), isTrending: true,
  },
  {
    id: "2", name: "Silk Anarkali Kurta Set", brand: "Biba", category: "women",
    price: 3499, originalPrice: 6999, discount: 50, rating: 4.7, reviewCount: 512,
    image: img("photo-1583391733956-3750e0ff4e8b"), images: [img("photo-1583391733956-3750e0ff4e8b")],
    description: "Luxurious silk Anarkali kurta with intricate zari work. A masterpiece of Indian craftsmanship.",
    specs: { Material: "Pure Silk", Work: "Zari Embroidery", Length: "Ankle Length", Dupatta: "Included" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example2"), isTrending: true,
  },
  {
    id: "3", name: "Noise ColorFit Pro 5", brand: "Noise", category: "electronics",
    price: 2999, originalPrice: 5999, discount: 50, rating: 4.3, reviewCount: 1823,
    image: img("photo-1523275335684-37898b6baf30"), images: [img("photo-1523275335684-37898b6baf30")],
    description: "Advanced smartwatch with AMOLED display, heart rate monitoring, and 7-day battery life.",
    specs: { Display: "1.85\" AMOLED", Battery: "7 Days", Sensors: "SpO2, HR", Water: "IP68" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example3"), isFlashSale: true, flashSaleEnds: "2026-03-14T23:59:59",
  },
  {
    id: "4", name: "Handwoven Pashmina Shawl", brand: "FabIndia", category: "women",
    price: 7999, originalPrice: 14999, discount: 47, rating: 4.9, reviewCount: 89,
    image: img("photo-1601924921557-45e6dea0c96f"), images: [img("photo-1601924921557-45e6dea0c96f")],
    description: "Authentic Kashmiri Pashmina, handwoven by master artisans over 3 months.",
    specs: { Material: "100% Pashmina", Origin: "Kashmir", Weight: "150g", Size: "200cm x 70cm" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example4"), isTrending: true,
  },
  {
    id: "5", name: "Titan Raga Gold Watch", brand: "Titan", category: "luxury",
    price: 12999, originalPrice: 19999, discount: 35, rating: 4.6, reviewCount: 345,
    image: img("photo-1524592094714-0f0654e20314"), images: [img("photo-1524592094714-0f0654e20314")],
    description: "Elegant gold-plated women's watch with mother-of-pearl dial and Swarovski crystals.",
    specs: { Movement: "Quartz", Case: "Gold Plated", Dial: "Mother of Pearl", Strap: "Leather" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example5"), isFlashSale: true, flashSaleEnds: "2026-03-14T23:59:59",
  },
  {
    id: "6", name: "Puma RS-X Running Shoes", brand: "Puma", category: "sports",
    price: 5499, originalPrice: 8999, discount: 39, rating: 4.4, reviewCount: 678,
    image: img("photo-1542291026-7eec264c27ff"), images: [img("photo-1542291026-7eec264c27ff")],
    description: "Retro-inspired running shoes with RS cushioning technology for maximum comfort.",
    specs: { Upper: "Mesh + Leather", Sole: "RS Cushioning", Weight: "320g", Style: "Retro Running" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example6"), isTrending: true,
  },
  {
    id: "7", name: "Lakme Absolute Skin Dew Serum", brand: "Lakme", category: "beauty",
    price: 899, originalPrice: 1499, discount: 40, rating: 4.2, reviewCount: 2341,
    image: img("photo-1571781926291-c477ebfd024b"), images: [img("photo-1571781926291-c477ebfd024b")],
    description: "Hydrating serum foundation with hyaluronic acid for a natural dewy glow.",
    specs: { Volume: "30ml", Type: "Serum Foundation", SPF: "SPF 20", Skin: "All Types" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example7"),
  },
  {
    id: "8", name: "Boat Airdopes 441 Pro", brand: "Boat", category: "electronics",
    price: 1799, originalPrice: 3999, discount: 55, rating: 4.1, reviewCount: 5432,
    image: img("photo-1590658268037-6bf12f032f55"), images: [img("photo-1590658268037-6bf12f032f55")],
    description: "True wireless earbuds with ANC, 45-hour playback, and quad mics for crystal clear calls.",
    specs: { Driver: "10mm", ANC: "Active", Battery: "45 Hours", Bluetooth: "5.3" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example8"), isFlashSale: true, flashSaleEnds: "2026-03-14T23:59:59",
  },
  {
    id: "9", name: "Allen Solly Oxford Shirt", brand: "Allen Solly", category: "men",
    price: 1499, originalPrice: 2499, discount: 40, rating: 4.3, reviewCount: 1200,
    image: img("photo-1602810318383-e386cc2a3ccf"), images: [img("photo-1602810318383-e386cc2a3ccf")],
    description: "Classic Oxford cotton shirt with button-down collar. A wardrobe essential.",
    specs: { Material: "100% Cotton", Fit: "Regular", Collar: "Button Down", Wash: "Machine Washable" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example9"),
  },
  {
    id: "10", name: "Woodland Leather Boots", brand: "Woodland", category: "men",
    price: 4299, originalPrice: 6999, discount: 39, rating: 4.5, reviewCount: 890,
    image: img("photo-1520639888713-7851133b1ed0"), images: [img("photo-1520639888713-7851133b1ed0")],
    description: "Genuine leather boots with anti-skid sole, perfect for outdoor adventures.",
    specs: { Material: "Genuine Leather", Sole: "Rubber Anti-skid", Closure: "Lace-up", Season: "All Season" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example10"), isTrending: true,
  },
  {
    id: "11", name: "Ceramic Planter Set", brand: "FabIndia", category: "home",
    price: 1299, originalPrice: 2199, discount: 41, rating: 4.6, reviewCount: 156,
    image: img("photo-1485955900006-10f4d324d411"), images: [img("photo-1485955900006-10f4d324d411")],
    description: "Set of 3 hand-painted ceramic planters in earthy tones. Adds warmth to any space.",
    specs: { Material: "Ceramic", Set: "3 Pieces", Style: "Hand-painted", Use: "Indoor/Outdoor" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example11"),
  },
  {
    id: "12", name: "Kids Cotton Kurta Set", brand: "Biba", category: "kids",
    price: 999, originalPrice: 1999, discount: 50, rating: 4.4, reviewCount: 432,
    image: img("photo-1519238263530-99bdd11df2ea"), images: [img("photo-1519238263530-99bdd11df2ea")],
    description: "Comfortable cotton kurta with dhoti pants for festive occasions.",
    specs: { Material: "Pure Cotton", Age: "3-12 Years", Occasion: "Festive", Care: "Machine Wash" },
    affiliateUrl: getAffiliateUrl("https://amazon.in/dp/example12"),
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "The Grand Indian\nFashion Festival",
    subtitle: "Up to 70% off on premium brands",
    cta: "Shop Now",
    bg: "from-primary/5 to-accent/10",
    image: img("photo-1558618666-fcd25c85f82e"),
  },
  {
    id: 2,
    title: "Electronics\nMega Sale",
    subtitle: "Latest gadgets at unbeatable prices",
    cta: "Explore Deals",
    bg: "from-secondary to-muted",
    image: img("photo-1468495244123-6c6c332eeece"),
  },
  {
    id: 3,
    title: "Luxury\nCollection",
    subtitle: "Timeless pieces from heritage brands",
    cta: "Discover",
    bg: "from-accent/5 to-primary/5",
    image: img("photo-1441984904996-e0b6ba687e04"),
  },
];
