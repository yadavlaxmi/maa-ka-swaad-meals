import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import heroImg from "@/assets/hero-thali.jpg";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Delicious home-cooked thali" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
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
            className="text-accent font-body font-semibold text-lg mb-4 tracking-wide uppercase"
          >
            🍛 Ghar Jaisa Khana, Har Din
          </motion.p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-background leading-tight mb-6">
            Maa Ka Swad<br />
            <span className="text-accent">Tiffin Center</span>
          </h1>
          <p className="font-body text-background/80 text-lg md:text-xl mb-10 max-w-lg">
            Fresh, hygienic, and home-cooked meals delivered daily. Order one meal or subscribe monthly!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to={user ? "/order" : "/auth"}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              🍽️ Order Today
            </Link>
            <Link
              to={user ? "/subscribe" : "/auth"}
              className="border-2 border-accent text-accent px-8 py-4 rounded-xl font-body font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-all"
            >
              📅 Subscribe
            </Link>
            <Link
              to={user ? "/admin" : "/auth"}
              className="border-2 border-background/50 text-background px-8 py-4 rounded-xl font-body font-bold text-lg hover:bg-background/10 transition-all"
            >
              🔒 Admin
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
