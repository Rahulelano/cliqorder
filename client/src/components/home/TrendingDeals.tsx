import { Link } from "react-router-dom";
import { products } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/data/mockData";

interface Props {
  onQuickView: (p: Product) => void;
  products?: Product[];
}

const TrendingDeals = ({ onQuickView, products: customProducts }: Props) => {
  const allProducts = customProducts || products;
  const trending = allProducts.filter((p) => p.isTrending);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Amazon Best Sellers</h2>
        <Link to="/products" className="text-sm font-body text-amazon font-medium hover:opacity-80 transition-opacity">View All →</Link>
      </div>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {trending.map((p) => (
          <div key={p.id} className="min-w-[220px] max-w-[220px] snap-start flex-shrink-0 sm:min-w-[240px] sm:max-w-[240px]">
            <ProductCard product={p} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingDeals;
