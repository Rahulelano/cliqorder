import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { products as localProducts, categories, type Product } from "@/data/mockData";
import { SlidersHorizontal, X } from "lucide-react";

const sortOptions = [
  { label: "Popularity", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Rating", value: "rating" },
];

const ProductListing = () => {
  const [params] = useSearchParams();
  const categoryParam = params.get("category") || "";
  const subParam = params.get("sub") || "";
  const [sort, setSort] = useState("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const { data: remoteProducts } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/products`);
      return res.data;
    },
    staleTime: 60000,
  });

  const products = remoteProducts || [];

  const allBrands = [...new Set(products.map((p) => p.brand))];
  const currentCategory = categories.find((c) => c.id.toLowerCase() === categoryParam.toLowerCase());

  const filtered = useMemo(() => {
    let result = products;
    if (categoryParam) {
      result = result.filter((p) => p.category?.toLowerCase() === categoryParam.toLowerCase());
    }
    if (subParam) {
      const sub = subParam.toLowerCase();
      result = result.filter((p: any) => 
        (p.subcategory?.toLowerCase() === sub) ||
        (p.name?.toLowerCase().includes(sub)) || 
        (p.description?.toLowerCase().includes(sub))
      );
    }
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);

    switch (sort) {
      case "price-asc": return [...result].sort((a, b) => a.price - b.price);
      case "price-desc": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      case "newest": return [...result].reverse();
      default: return [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [products, categoryParam, subParam, sort, selectedBrands, priceRange, minRating]);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      {currentCategory && (
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Sub Categories</h4>
          <div className="space-y-1.5 overflow-hidden">
            {currentCategory.subcategories.map((sub) => (
              <Link
                key={sub}
                to={`/products?category=${categoryParam}&sub=${sub.toLowerCase()}`}
                className={`block text-sm font-body transition-colors ${subParam === sub.toLowerCase() ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"}`}
              >
                {sub}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Price Range</h4>
        <div className="flex items-center gap-2 text-sm font-body">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-20 rounded border bg-background px-2 py-1 text-sm"
            placeholder="Min"
          />
          <span className="text-muted-foreground">to</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-20 rounded border bg-background px-2 py-1 text-sm"
            placeholder="Max"
          />
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Brands</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {allBrands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="rounded border-border accent-accent"
              />
              {b}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold mb-3">Rating</h4>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm font-body transition-colors ${minRating === r ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"}`}
            >
              {"★".repeat(r)}{"☆".repeat(5 - r)} & Up
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm font-body text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{currentCategory?.name || "All Products"}</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold md:text-3xl">
            {currentCategory?.name || "All Products"}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-body lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border bg-background px-3 py-2 text-sm font-body outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile Filter Drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden bg-foreground/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
              <div className="absolute left-0 top-0 h-full w-72 bg-background p-6 shadow-mega animate-slide-down overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg font-bold">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <p className="mb-4 text-sm font-body text-muted-foreground">{filtered.length} products found</p>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="py-20 text-center text-muted-foreground font-body">
                No products match your filters. Try adjusting your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </Layout>
  );
};

export default ProductListing;
