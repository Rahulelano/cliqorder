import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/product/ProductCard";
import { products as localProducts, type Product } from "@/data/mockData";
import { ExternalLink, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const { data: allRemoteProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/products`);
      return res.data;
    },
    staleTime: 60000,
  });

  const allProducts = allRemoteProducts || [];
  const product = allProducts.find((p) => p.id === id || (p as any)._id === id);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={40} />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Product not found</h1>
          <Link to="/" className="mt-4 inline-block text-accent font-body hover:opacity-80">← Back to Home</Link>
        </div>
      </Layout>
    );
  }

  const similar = allProducts.filter((p) => p.category === product.category && (p.id !== product.id && (p as any)._id !== (product as any)._id)).slice(0, 4);
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm font-body text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-xl bg-secondary aspect-[3/4] group">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[currentImage]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((c) => (c - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-soft"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((c) => (c + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-soft"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors ${i === currentImage ? "border-accent" : "border-transparent"}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">
            <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground">{product.brand}</p>
            <h1 className="font-display text-3xl font-bold lg:text-4xl">{product.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5">
                <Star size={14} className="fill-accent text-accent" />
                <span className="text-sm font-body font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm font-body text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-body font-bold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg font-body text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="gradient-gold rounded-md px-2.5 py-1 text-sm font-body font-bold text-primary-foreground">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-sm font-body text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Specs */}
            <div className="rounded-xl bg-secondary p-4">
              <h3 className="font-display text-sm font-semibold mb-3">Specifications</h3>
              <div className="space-y-2">
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm font-body">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-medium">{val as string}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-body text-muted-foreground italic">Check Amazon for full specifications</p>
                )}
              </div>
            </div>

            {/* Amazon CTA */}
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amazon py-4 text-base font-body font-bold text-primary-foreground transition-opacity hover:opacity-90 shadow-elevated"
            >
              Buy on Amazon <ExternalLink size={18} />
            </a>
            <p className="text-center text-xs font-body text-muted-foreground">
              You'll be redirected to Amazon.in with our affiliate link
            </p>
          </div>
        </div>

        {/* Similar Products */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
              ))}
            </div>
          </section>
        )}
      </div>
      {quickView && (
        <div className="fixed inset-0 z-[70]">
          {/* Inline quick view for PDP */}
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
