import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const collections = [
  { title: "Ethnic Elegance", desc: "Traditional meets contemporary", bg: "from-accent/10 to-secondary", link: "/products?category=women" },
  { title: "Tech Essentials", desc: "Latest gadgets curated for you", bg: "from-secondary to-muted", link: "/products?category=electronics" },
  { title: "Active Lifestyle", desc: "Performance gear for champions", bg: "from-muted to-accent/10", link: "/products?category=sports" },
];

const FeaturedCollections = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-center font-display text-2xl font-bold md:text-3xl">Featured Collections</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {collections.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={c.link}
              className={`block rounded-xl bg-gradient-to-br ${c.bg} p-8 text-center shadow-soft transition-shadow hover:shadow-elevated`}
            >
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm font-body text-muted-foreground">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-body font-semibold text-accent hover:opacity-80">
                Explore →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
