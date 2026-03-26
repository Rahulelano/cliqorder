import { useState, useEffect } from "react";
import { products } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/data/mockData";
import { Zap } from "lucide-react";

interface Props {
  onQuickView: (p: Product) => void;
  products?: Product[];
}

const FlashSale = ({ onQuickView, products: customProducts }: Props) => {
  const allProducts = customProducts || products;
  const flashProducts = allProducts.filter((p) => p.isFlashSale);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const end = new Date("2026-03-14T23:59:59");
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) { setTimeLeft("Ended"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${h}h ${m}m ${s}s`);
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="text-amazon" size={24} />
          <h2 className="font-display text-2xl font-bold md:text-3xl">Amazon Lightning Deals</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-body text-muted-foreground">Ends in</span>
          <span className="rounded-lg bg-primary px-3 py-1 font-body text-sm font-bold text-primary-foreground tabular-nums">{timeLeft}</span>
        </div>
      </div>
      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {flashProducts.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
