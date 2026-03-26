import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { motion } from "framer-motion";

const CategoryGrid = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Shop by Category</h2>
      <div className="mt-8 grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className="flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-secondary"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-2xl shadow-soft">
                {cat.icon}
              </div>
              <span className="text-xs font-body font-medium text-foreground/80">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
