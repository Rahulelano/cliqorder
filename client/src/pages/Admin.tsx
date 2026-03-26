import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { products as initialProducts } from "@/data/mockData";
import { ExternalLink, Save, Search, LogIn, X, Sparkles } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const categoriesList = ["men", "women", "electronics", "home", "beauty", "kids", "sports", "luxury"];

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("luxury");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", image: "", url: "", price: "", brand: "", description: "" });

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      toast.error("Error fetching products. Make sure server is running.");
    }
  };

  const autoDetectCategory = (name: string) => {
    const text = name.toLowerCase();
    
    // Men's Fashion
    if (text.includes("shirt") || text.includes("t-shirt") || (text.includes("men") && !text.includes("women"))) { 
      setNewCategory("men"); 
      setNewSubCategory(text.includes("shirt") ? "Shirts" : "Trousers");
    }
    // Women's Fashion
    else if (text.includes("dress") || text.includes("women") || text.includes("saree") || text.includes("kurta")) { 
      setNewCategory("women"); 
      setNewSubCategory("Dresses"); 
    }
    // Electronics
    else if (text.includes("iphone") || text.includes("samsung") || text.includes("phone") || text.includes("mobile") || text.includes("pixel")) { 
      setNewCategory("electronics"); 
      setNewSubCategory("Smartphones"); 
    }
    else if (text.includes("laptop") || text.includes("macbook") || text.includes("dell") || text.includes("hp")) { 
      setNewCategory("electronics"); 
      setNewSubCategory("Laptops"); 
    }
    else if (text.includes("headphone") || text.includes("earphone") || text.includes("earbuds") || text.includes("airpods") || text.includes("boat")) { 
      setNewCategory("electronics"); 
      setNewSubCategory("Headphones"); 
    }
    else if (text.includes("watch") || text.includes("smartwatch")) { 
      setNewCategory("luxury"); 
      setNewSubCategory("Watches"); 
    }
    // Beauty
    else if (text.includes("serum") || text.includes("cream") || text.includes("lipstick") || text.includes("makeup") || text.includes("lakme")) { 
      setNewCategory("beauty"); 
      setNewSubCategory("Skincare"); 
    }
    // Home
    else if (text.includes("furniture") || text.includes("decor") || text.includes("kitchen") || text.includes("lamp")) { 
      setNewCategory("home"); 
      setNewSubCategory("Decor"); 
    }
  };

  const handleScrape = async () => {
    if (!newProduct.url) { toast.error("Enter URL first"); return; }
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/scrape`, { url: newProduct.url });
      setNewProduct({ ...newProduct, ...res.data, url: newProduct.url });
      if (res.data.name) autoDetectCategory(res.data.name);
      toast.success("Details fetched automatically!");
    } catch (e) { toast.error("Could not fetch details. Please fill manually."); }
    finally { setLoading(false); }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsLoggedIn(true);
      toast.success("Logged in successfully");
    } else {
      toast.error("Incorrect password");
    }
  };

  const updateLink = async (id: string, newUrl: string) => {
    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/products/${id}`, { affiliateUrl: newUrl });
      toast.success("Amazon link updated");
      fetchProducts();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    (p.name?.toLowerCase() || "").includes(search.toLowerCase()) || 
    (p.brand?.toLowerCase() || "").includes(search.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md space-y-8 rounded-2xl border p-8 shadow-mega bg-card">
            <div className="text-center">
              <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
              <p className="mt-2 text-sm text-muted-foreground">Login to update Amazon Affiliate links</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-primary/20"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl gradient-gold text-primary font-bold">
                <LogIn className="mr-2" size={18} /> Login
              </Button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* Global Config */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-2xl font-bold">Global Settings</h2>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Banner Text (Top Strip)</label>
                <Input 
                  id="announcement-text" 
                  defaultValue="📦 Exclusive Amazon Luxury Deals — Handpicked Selection with Fast Prime Shipping | Best Reviews Guaranteed"
                  className="rounded-xl"
                />
              </div>
              <Button 
                onClick={async () => {
                  const text = (document.getElementById("announcement-text") as HTMLInputElement).value;
                  try {
                    await axios.post(`${API_BASE_URL}/config`, { key: "announcement_text", value: text });
                    toast.success("Announcement updated");
                  } catch (err) { toast.error("Update failed"); }
                }}
                className="w-full rounded-xl gradient-gold text-primary font-bold"
              >
                Update Banner Text
              </Button>
            </div>
          </div>

          {/* New Link Creation */}
          <div className="rounded-2xl border bg-card p-6 shadow-soft">
            <h2 className="mb-4 font-display text-2xl font-bold">Add New Link (Product)</h2>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  placeholder="Paste Amazon Link Here" 
                  value={newProduct.url} 
                  onChange={(e) => setNewProduct({ ...newProduct, url: e.target.value })}
                  className="rounded-xl"
                />
                <Button onClick={handleScrape} disabled={loading} className="rounded-xl bg-accent hover:bg-accent/90">
                  <Sparkles size={18} className="mr-2" /> {loading ? "..." : "Magic Fetch"}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input 
                  placeholder="Product Name" 
                  value={newProduct.name} 
                  onChange={(e) => {
                    setNewProduct({ ...newProduct, name: e.target.value });
                    autoDetectCategory(e.target.value);
                  }}
                  className="rounded-xl" 
                />
                <select 
                  className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <Input 
                  placeholder="Image URL" 
                  value={newProduct.image} 
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="rounded-xl" 
                />
                <Input 
                  placeholder="Price (INR)" 
                  value={newProduct.price} 
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="rounded-xl" 
                />
                <Input 
                   placeholder="Sub-Category (e.g. Smartphones)" 
                   value={newSubCategory} 
                   onChange={(e) => setNewSubCategory(e.target.value)}
                   className="rounded-xl col-span-2" 
                />
                <Input 
                  placeholder="Brand" 
                  value={newProduct.brand} 
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="rounded-xl" 
                />
              </div>
              <Button 
                onClick={async () => {
                  if (!newProduct.name || !newProduct.url) { toast.error("Please fill Name and URL"); return; }
                  try {
                    await axios.post(`${API_BASE_URL}/products`, {
                      id: Math.random().toString(36).substr(2, 9),
                      ...newProduct,
                      category: newCategory,
                      subcategory: newSubCategory,
                      price: Number(newProduct.price) || 2999,
                      originalPrice: (Number(newProduct.price) || 2999) * 1.5,
                      discount: 33, rating: 4.8, reviewCount: 12,
                      isTrending: true,
                      isFlashSale: true,
                      flashSaleEnds: new Date(Date.now() + 86400000).toISOString() // 24h from now
                    });
                    toast.success("New product added!");
                    fetchProducts();
                    setNewProduct({ name: "", image: "", url: "", price: "", brand: "", description: "" });
                    setNewSubCategory("");
                  } catch (err) { toast.error("Failed to add"); }
                }}
                className="w-full rounded-xl bg-primary text-primary-foreground font-bold"
              >
                Add New Amazon Link
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Update Amazon Affiliate URLs for all products</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="min-w-[300px]">Amazon Affiliate URL</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img src={product.image} className="h-12 w-12 rounded-lg object-cover" />
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    <div>{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.brand}</div>
                  </TableCell>
                  <TableCell>
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent uppercase">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Input
                        defaultValue={product.affiliateUrl}
                        id={`url-${product._id}`}
                        className="font-mono text-xs rounded-lg"
                      />
                      <a href={product.affiliateUrl} target="_blank" className="text-muted-foreground hover:text-primary pt-2">
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => {
                          const input = document.getElementById(`url-${product._id}`) as HTMLInputElement;
                          updateLink(product._id, input.value);
                        }}
                        className="rounded-lg bg-primary hover:bg-primary/90"
                      >
                        <Save size={16} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={async () => {
                          if (confirm(`Delete "${product.name}"?`)) {
                            try {
                              await axios.delete(`${API_BASE_URL}/products/${product._id}`);
                              toast.success("Product deleted");
                              fetchProducts();
                            } catch (e) { toast.error("Delete failed"); }
                          }
                        }}
                        className="rounded-lg"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
