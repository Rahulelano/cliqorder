import { Link } from "react-router-dom";
import { Mail, Facebook, Instagram } from "lucide-react";
import { useState } from "react";

const footerLinks = {
  "Shop": ["Men", "Women", "Electronics", "Home & Living", "Beauty", "Kids"],
  "Help": ["Track Order", "Returns", "FAQs", "Contact Us"],
  "Company": ["About Us", "Careers", "Press", "Sustainability"],
  "Legal": ["Privacy Policy", "Terms of Use", "Cookie Policy"],
};

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Cliqorder" className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-3 text-sm font-body text-primary-foreground/70">
              Curating the finest luxury deals and premium products from Amazon. Experience curated excellence with Cliqorder.
            </p>
            <div className="mt-6 flex gap-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61564079707062" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-accent hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/cliqorder?igsh=bWJyaXQ4ZDZpb3hq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-all hover:bg-accent hover:text-white"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground/50">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => {
                  let href = "#";
                  const path = link.toLowerCase().replace(/\s+/g, '-');
                  if (title === "Shop") {
                    const catId = link.toLowerCase().replace(" & ", "").split(" ")[0];
                    href = `/products?category=${catId}`;
                  } else {
                    href = `/${path}`;
                  }
                  return (
                    <li key={link}>
                      <Link to={href} className="text-sm font-body text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                        {link}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-primary-foreground/10 pt-8 sm:flex-row sm:justify-between">
          <div>
            <h4 className="font-display text-base font-semibold">Stay in the Loop</h4>
            <p className="text-sm font-body text-primary-foreground/60">Subscribe for exclusive deals and new arrivals.</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-3">
              <Mail size={16} className="text-primary-foreground/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-48 bg-transparent py-2 text-sm font-body text-primary-foreground outline-none placeholder:text-primary-foreground/40"
              />
            </div>
            <button 
               onClick={async () => {
                 if (!email) return;
                  try {
                    const res = await fetch("http://localhost:8000/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name: "Newsletter", email, message: "New subscription request" })
                    });
                    if (res.ok) {
                      alert("Successfully subscribed!");
                      setEmail("");
                    }
                  } catch (err) { alert("Failed to subscribe"); }
               }}
               className="rounded-lg gradient-gold px-5 py-2 text-sm font-body font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-xs font-body text-primary-foreground/40">
          © 2026 Cliqorder. All rights reserved. | Affiliate Disclosure: We earn commissions from qualifying purchases.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
