import Layout from "@/components/layout/Layout";
import { useLocation, Link } from "react-router-dom";

const StaticPage = () => {
  const { pathname } = useLocation();
  const title = pathname.slice(1).replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 animate-fade-in">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{title}</h1>
        <div className="mt-8 max-w-2xl text-lg font-body text-muted-foreground leading-relaxed">
          <p>This is the {title} page for Cliqorder. We are working hard to bring you the best curated Amazon affiliate deals.</p>
          <p className="mt-4">Please check back soon for more detailed information about our premium services and handpicked selections.</p>
        </div>
        <Link to="/" className="mt-12 inline-block rounded-full bg-accent px-8 py-3 font-body font-semibold text-primary-foreground transition-opacity hover:opacity-90">
          Back to Home
        </Link>
      </div>
    </Layout>
  );
};

export default StaticPage;
