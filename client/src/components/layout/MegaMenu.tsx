import { Link } from "react-router-dom";
import type { Category } from "@/data/mockData";

interface Props {
  category: Category;
}

const MegaMenu = ({ category }: Props) => {
  return (
    <div className="absolute left-0 top-full z-50 w-[480px] animate-slide-down rounded-b-lg bg-background p-6 shadow-mega">
      <div className="mb-3 font-display text-lg font-semibold">{category.name}</div>
      <div className="grid grid-cols-2 gap-2">
        {category.subcategories.map((sub) => (
          <Link
            key={sub}
            to={`/products?category=${category.id}&sub=${sub.toLowerCase()}`}
            className="rounded-md px-3 py-2 text-sm font-body text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            {sub}
          </Link>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t">
        <Link
          to={`/products?category=${category.id}`}
          className="text-sm font-body font-medium text-gradient-gold hover:opacity-80 transition-opacity"
        >
          View All {category.name} →
        </Link>
      </div>
    </div>
  );
};

export default MegaMenu;
