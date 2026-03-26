import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import MegaMenu from "./MegaMenu";
import SearchOverlay from "./SearchOverlay";
import { categories } from "@/data/mockData";

const Header = () => {
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-soft">
      {/* Main Nav */}
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Cliqorder" className="h-8 w-auto object-contain md:h-10" />
          </Link>
        </div>

        {/* Desktop Category Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {categories.slice(0, 7).map((cat) => (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => setMegaOpen(cat.id)}
              onMouseLeave={() => setMegaOpen(null)}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="px-3 py-2 text-sm font-medium font-body text-foreground/80 transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
              >
                {cat.name}
              </Link>
              {megaOpen === cat.id && <MegaMenu category={cat} />}
            </div>
          ))}
          <Link
            to="/products?tag=trending"
            className="px-3 py-2 text-sm font-semibold font-body text-accent transition-colors hover:text-accent/80"
          >
            🔥 Top Deals
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(true)} className="text-foreground/70 transition-colors hover:text-foreground">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="text-foreground/70 transition-colors hover:text-foreground relative">
            <Heart size={20} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full gradient-gold text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Link>
          <button className="hidden sm:block text-foreground/70 transition-colors hover:text-foreground">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-background animate-slide-down">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="block py-2 text-sm font-body font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
};

export default Header;
