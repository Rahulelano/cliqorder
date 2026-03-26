import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryGrid from "@/components/home/CategoryGrid";
import TrendingDeals from "@/components/home/TrendingDeals";
import BrandShowcase from "@/components/home/BrandShowcase";
import FlashSale from "@/components/home/FlashSale";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import ProductGrid from "@/components/home/ProductGrid";
import QuickViewModal from "@/components/product/QuickViewModal";
import type { Product } from "@/data/mockData";

const Index = () => {
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

  return (
    <Layout>
      <HeroCarousel />
      <CategoryGrid />
      <TrendingDeals onQuickView={setQuickView} products={products} />
      <BrandShowcase />
      <FlashSale onQuickView={setQuickView} products={products} />
      <FeaturedCollections />
      <ProductGrid onQuickView={setQuickView} products={products} />
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </Layout>
  );
};

export default Index;
