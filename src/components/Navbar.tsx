import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Maa Ka Swad Logo" className="h-10 w-10" />
          <span className="font-display text-xl font-bold text-foreground">
            Maa Ka Swad
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#menu" className="font-body text-muted-foreground hover:text-primary transition-colors">Menu</a>
          <a href="#plans" className="font-body text-muted-foreground hover:text-primary transition-colors">Plans</a>
          <a href="#about" className="font-body text-muted-foreground hover:text-primary transition-colors">About</a>
          <a href="#contact" className="font-body text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>
        <a
          href="#plans"
          className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
        >
          Subscribe Now
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
