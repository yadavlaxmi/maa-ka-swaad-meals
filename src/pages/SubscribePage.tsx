import { useState } from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const mealOptions = [
  { id: "lunch", label: "Lunch Only", price: "₹1,500/mo" },
  { id: "dinner", label: "Dinner Only", price: "₹1,500/mo" },
  { id: "both", label: "Lunch + Dinner", price: "₹2,500/mo" },
];

const planOptions = [
  { id: "weekly", label: "1 Week", discount: "" },
  { id: "15days", label: "15 Days", discount: "5% off" },
  { id: "monthly", label: "1 Month", discount: "10% off" },
];

const SubscribePage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) return null;
  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMeal || !selectedPlan) {
      toast({ title: "Please select meal & plan", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      meal_type: selectedMeal,
      plan: selectedPlan,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Subscription started! 🎉" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Maa Ka Swad Logo" className="h-10 w-10" />
            <span className="font-display text-xl font-bold text-foreground">Maa Ka Swad</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Monthly Subscription</h1>
              <p className="text-muted-foreground font-body text-sm">Get daily home-cooked meals delivered</p>
            </div>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-secondary/10 border border-secondary/30 rounded-2xl p-10 text-center">
              <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Subscribed! 🎉</h3>
              <p className="text-muted-foreground font-body">Your tiffin subscription is now active.</p>
              <Link to="/menu" className="mt-6 inline-block text-primary font-body font-semibold hover:underline">
                View Weekly Menu →
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Name *</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Phone *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Address *</label>
                <textarea required rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-foreground block mb-2">Select Meal *</label>
                <div className="grid grid-cols-3 gap-3">
                  {mealOptions.map((meal) => (
                    <button key={meal.id} type="button" onClick={() => setSelectedMeal(meal.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all font-body text-sm ${
                        selectedMeal === meal.id ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/30 text-muted-foreground"
                      }`}>
                      <div className="font-semibold">{meal.label}</div>
                      <div className="text-xs mt-1 text-primary font-bold">{meal.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-body text-sm font-semibold text-foreground block mb-2">Select Duration *</label>
                <div className="grid grid-cols-3 gap-3">
                  {planOptions.map((plan) => (
                    <button key={plan.id} type="button" onClick={() => setSelectedPlan(plan.id)}
                      className={`p-3 rounded-xl border-2 text-center transition-all font-body text-sm ${
                        selectedPlan === plan.id ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/30 text-muted-foreground"
                      }`}>
                      <div className="font-semibold">{plan.label}</div>
                      {plan.discount && <div className="text-xs mt-1 text-secondary font-bold">{plan.discount}</div>}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                <UtensilsCrossed className="w-5 h-5" />
                {loading ? "Subscribing..." : "Start Subscription"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SubscribePage;
