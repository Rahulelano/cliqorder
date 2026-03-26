import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/mockData";

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: Props) => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-card rounded-lg overflow-hidden shadow-soft transition-shadow duration-300 hover:shadow-elevated"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute left-3 top-3 z-10 rounded-md gradient-gold px-2 py-0.5 text-xs font-body font-bold text-primary-foreground">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
      >
        <Heart size={16} className={wishlisted ? "fill-accent text-accent" : "text-foreground/50"} />
      </button>

      {/* Image */}
      <Link to={`/product/${(product as any)._id || product.id}`} className="block overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </Link>

      {/* Quick View & Amazon Link */}
      <div className="absolute bottom-[130px] left-0 right-0 flex justify-center gap-2 px-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="rounded-full bg-primary px-3 py-1.5 text-[10px] font-body font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-105"
          >
            Quick View
          </button>
        )}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-amazon px-3 py-1.5 text-[10px] font-body font-bold text-white shadow-elevated transition-transform hover:scale-105"
        >
          Check Price
        </a>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs font-body font-medium text-amazon uppercase tracking-wider">{product.brand}</p>
        <Link to={`/product/${(product as any)._id || product.id}`}>
          <h3 className="mt-1 text-sm font-body font-medium text-foreground line-clamp-2 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-body font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs font-body text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-xs text-accent">★</span>
          <span className="text-xs font-body text-muted-foreground">{product.rating} ({product.reviewCount})</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
