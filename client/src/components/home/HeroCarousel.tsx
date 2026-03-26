import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroFashion from "@/assets/hero-fashion.jpg";
import heroElectronics from "@/assets/hero-electronics.jpg";
import heroLuxury from "@/assets/hero-luxury.jpg";

const slides = [
  {
    id: 1,
    tag: "AMAZON BEST DEALS",
    title: "Handpicked Luxury\nCurated for You",
    subtitle: "Discover the best-rated luxury fashion and lifestyle products from Amazon's top-tier selection. Expertly curated by Cliqorder.",
    cta: "Shop on Amazon",
    image: heroFashion,
    accent: "hsl(33, 100%, 50%)",
  },
  {
    id: 2,
    tag: "TECH RECOMMENDATIONS",
    title: "Must-Have\nSmart Gadgets",
    subtitle: "Explore our curated list of high-performance electronics. From the latest smartwatches to studio-quality earbuds, found for you on Amazon.",
    cta: "View Tech Deals",
    image: heroElectronics,
    accent: "hsl(33, 100%, 50%)",
  },
  {
    id: 3,
    tag: "EXCLUSIVE FINDS",
    title: "Premium Home\n& Accessories",
    subtitle: "Elevate your living space with these heritage-inspired pieces. Timeless designs available now via our curated Amazon selection.",
    cta: "Discover More",
    image: heroLuxury,
    accent: "hsl(33, 100%, 50%)",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const slide = slides[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-50%" : "50%", opacity: 0 }),
  };

  return (
    <section
      className="relative overflow-hidden bg-foreground"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 opacity-20 blur-[120px] transition-colors duration-1000"
        style={{ background: `radial-gradient(circle at 70% 50%, ${slide.accent}, transparent 70%)` }}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="container mx-auto px-4 py-8 md:py-12 lg:py-0">
            <div className="grid min-h-[480px] items-center gap-8 md:min-h-[540px] lg:min-h-[600px] lg:grid-cols-2">
              {/* Text Content */}
              <div className="relative z-10 flex flex-col justify-center py-8 lg:py-16">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary-foreground/80 font-body"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ background: slide.accent }}
                  />
                  {slide.tag}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  className="font-display text-4xl font-bold leading-[1.1] text-primary-foreground md:text-5xl lg:text-6xl xl:text-7xl whitespace-pre-line"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-5 max-w-md text-base font-body leading-relaxed text-primary-foreground/60 md:text-lg"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-8 flex items-center gap-4"
                >
                  <Link
                    to="/products"
                    className="group flex items-center gap-3 rounded-full px-8 py-3.5 font-body font-semibold text-foreground transition-all duration-300 hover:gap-4 hover:shadow-lg"
                    style={{ background: slide.accent }}
                  >
                    {slide.cta}
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link 
                    to="/about"
                    className="rounded-full border border-primary-foreground/20 px-6 py-3.5 font-body font-medium text-primary-foreground/80 transition-all duration-300 hover:border-primary-foreground/40 hover:text-primary-foreground"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              {/* Image */}
              <div className="relative hidden lg:flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Decorative ring */}
                  <div
                    className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl"
                    style={{ background: slide.accent }}
                  />
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="relative z-10 max-h-[480px] w-full rounded-2xl object-cover shadow-2xl"
                  />
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -bottom-4 -left-4 z-20 rounded-xl bg-background/95 p-4 shadow-elevated backdrop-blur-sm"
                  >
                    <p className="text-xs font-body text-muted-foreground">Starting from</p>
                    <p className="text-2xl font-display font-bold text-foreground">
                      ₹999
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/70 backdrop-blur-md transition-all duration-300 hover:bg-primary-foreground/10 hover:text-primary-foreground md:left-6"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground/70 backdrop-blur-md transition-all duration-300 hover:bg-primary-foreground/10 hover:text-primary-foreground md:right-6"
      >
        <ChevronRight size={22} />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="group relative flex items-center"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-10" : "w-3 bg-primary-foreground/25 group-hover:bg-primary-foreground/40"
              }`}
              style={i === current ? { background: slide.accent } : undefined}
            />
          </button>
        ))}
        <span className="ml-2 font-body text-xs tabular-nums text-primary-foreground/40">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default HeroCarousel;
