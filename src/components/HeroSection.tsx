import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-thali.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Delicious home-cooked thali" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-deep-brown/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-spice-gold font-body font-semibold text-lg mb-4 tracking-wide uppercase"
          >
            🍛 Ghar Jaisa Khana, Har Din
          </motion.p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-warm-cream leading-tight mb-6">
            Maa Ka Swad<br />
            <span className="text-spice-gold">Tiffin Center</span>
          </h1>
          <p className="font-body text-warm-cream/80 text-lg md:text-xl mb-10 max-w-lg">
            Fresh, hygienic, and home-cooked meals delivered daily. Perfect for students, working professionals, and anyone who misses Maa ke haath ka khana.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#plans"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Subscribe Now
            </a>
            <a
              href="#menu"
              className="border-2 border-spice-gold text-spice-gold px-8 py-4 rounded-xl font-body font-bold text-lg hover:bg-spice-gold hover:text-deep-brown transition-all"
            >
              View Menu
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
