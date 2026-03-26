import { X, ExternalLink } from "lucide-react";
import type { Product } from "@/data/mockData";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
  onClose: () => void;
}

const QuickViewModal = ({ product, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative mx-4 max-h-[90vh] w-full max-w-3xl animate-scale-in overflow-auto rounded-xl bg-background p-6 shadow-mega"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>
        <div className="grid gap-6 md:grid-cols-2">
          <img src={product.image} alt={product.name} className="w-full rounded-lg object-cover aspect-[3/4]" />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">{product.brand}</p>
            <h2 className="mt-1 font-display text-2xl font-bold">{product.name}</h2>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-body font-bold">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-base font-body text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="gradient-gold rounded-md px-2 py-0.5 text-xs font-body font-bold text-primary-foreground">{product.discount}% OFF</span>
                </>
              )}
            </div>
            <div className="mt-2 flex items-center gap-1">
              <span className="text-accent">★</span>
              <span className="text-sm font-body text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>
            <p className="mt-4 text-sm font-body text-muted-foreground leading-relaxed">{product.description}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-amazon py-3 text-sm font-body font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Buy on Amazon <ExternalLink size={14} />
              </a>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex-1 rounded-lg border border-border py-3 text-center text-sm font-body font-medium transition-colors hover:bg-secondary"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
