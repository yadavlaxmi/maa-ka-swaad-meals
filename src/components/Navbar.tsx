import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Maa Ka Swad Logo" className="h-10 w-10" />
          <span className="font-display text-xl font-bold text-foreground">Maa Ka Swad</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#menu" className="font-body text-muted-foreground hover:text-primary transition-colors">Menu</a>
          <a href="#plans" className="font-body text-muted-foreground hover:text-primary transition-colors">Plans</a>
          <Link to="/feedback" className="font-body text-muted-foreground hover:text-primary transition-colors">Feedback</Link>
          <a href="#contact" className="font-body text-muted-foreground hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/book"
                className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity"
              >
                Book Thali
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-body font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <User className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
