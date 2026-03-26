import { products } from "@/data/mockData";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/data/mockData";

interface Props {
  onQuickView: (p: Product) => void;
  products?: Product[];
}

const ProductGrid = ({ onQuickView, products: customProducts }: Props) => {
  const allProducts = customProducts || products;
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="font-display text-2xl font-bold md:text-3xl">Just For You</h2>
      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
