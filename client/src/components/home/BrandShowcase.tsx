import { brands } from "@/data/mockData";
import { motion } from "framer-motion";

const BrandShowcase = () => {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Top Brands</h2>
        <div className="mt-8 flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex min-w-[120px] snap-start flex-col items-center gap-2 rounded-xl bg-background p-4 shadow-soft transition-shadow hover:shadow-elevated cursor-pointer"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-gold font-display text-lg font-bold text-primary-foreground">
                {brand.logo}
              </div>
              <span className="text-xs font-body font-medium text-foreground/80 whitespace-nowrap">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
