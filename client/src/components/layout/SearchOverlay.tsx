import { useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/mockData";

interface Props {
  onClose: () => void;
}

const SearchOverlay = ({ onClose }: Props) => {
  const [query, setQuery] = useState("");
  const suggestions = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.brand.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-auto mt-20 max-w-2xl animate-scale-in rounded-xl bg-background p-4 shadow-mega" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b pb-3">
          <Search size={20} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="flex-1 bg-transparent font-body text-lg outline-none placeholder:text-muted-foreground"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>
        {suggestions.length > 0 && (
          <div className="mt-3 space-y-1">
            {suggestions.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                onClick={onClose}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
              >
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded object-cover" />
                <div>
                  <div className="text-sm font-medium font-body">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.brand} · ₹{p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {query.length > 1 && suggestions.length === 0 && (
          <div className="mt-4 text-center text-sm text-muted-foreground font-body py-4">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
