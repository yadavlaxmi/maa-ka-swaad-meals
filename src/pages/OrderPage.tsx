import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { UtensilsCrossed, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const todayMenu = {
  lunch: [
    { name: "Dal Tadka", category: "Dal" },
    { name: "Aloo Gobi", category: "Sabzi" },
    { name: "Paneer Bhurji", category: "Sabzi" },
    { name: "Rice", category: "Staple" },
    { name: "Roti (4)", category: "Staple" },
    { name: "Salad", category: "Side" },
    { name: "Pickle", category: "Side" },
  ],
  dinner: [
    { name: "Rajma", category: "Dal" },
    { name: "Mix Veg", category: "Sabzi" },
    { name: "Shahi Paneer", category: "Sabzi" },
    { name: "Rice", category: "Staple" },
    { name: "Roti (4)", category: "Staple" },
    { name: "Raita", category: "Side" },
  ],
};

const OrderPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [mealType, setMealType] = useState<"lunch" | "dinner">("lunch");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [extraRoti, setExtraRoti] = useState(0); // pairs of 2 extra roti
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const basePrice = 80;
  const extraRotiPrice = extraRoti * 10; // ₹10 per 2 extra roti
  const totalPrice = basePrice + extraRotiPrice;
  const totalExtraRoti = extraRoti * 2;

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const currentMenu = todayMenu[mealType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please login first", variant: "destructive" });
      navigate("/auth");
      return;
    }
    if (selectedItems.length === 0) {
      toast({ title: "Please select at least one item", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      meal_type: mealType,
      items: selectedItems,
      extra_roti: totalExtraRoti,
      special_instructions: instructions.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Order placed! 🎉" });
    }
    setLoading(false);
  };

  if (authLoading) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">Login Required</h2>
        <p className="text-muted-foreground font-body mb-6">You need to login to place an order.</p>
        <Link to="/auth" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-body font-bold hover:opacity-90">
          Login / Sign Up
        </Link>
      </div>
    );
  }

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

      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Order Today's Thali</h1>
              <p className="text-muted-foreground font-body text-sm">Choose your dishes — order at least 1 hour before delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body mb-8 ml-15">
            <Clock className="w-4 h-4" />
            <span>Lunch by 12 PM • Dinner by 8 PM • Order 1 hour before</span>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-secondary/10 border border-secondary/30 rounded-2xl p-10 text-center">
              <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Order Placed! 🎉</h3>
              <p className="text-muted-foreground font-body">Your {mealType} will be delivered on time.</p>
              <div className="flex flex-col gap-3 mt-6">
                <button onClick={() => { setSubmitted(false); setSelectedItems([]); setExtraRoti(0); }} className="text-primary font-body font-semibold hover:underline">
                  Order Again
                </button>
                <Link to="/" className="text-muted-foreground font-body hover:underline">Back to Home</Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Meal type toggle */}
              <div className="flex rounded-xl bg-muted p-1">
                <button type="button" onClick={() => { setMealType("lunch"); setSelectedItems([]); }}
                  className={`flex-1 py-3 rounded-lg font-body font-semibold transition-all ${mealType === "lunch" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  🌞 Lunch
                </button>
                <button type="button" onClick={() => { setMealType("dinner"); setSelectedItems([]); }}
                  className={`flex-1 py-3 rounded-lg font-body font-semibold transition-all ${mealType === "dinner" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
                  🌙 Dinner
                </button>
              </div>

              {/* Menu items selection */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-4">Select Your Dishes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentMenu.map((item) => (
                    <button key={item.name} type="button" onClick={() => toggleItem(item.name)}
                      className={`p-3 rounded-xl border-2 text-left transition-all font-body text-sm ${
                        selectedItems.includes(item.name)
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/30 text-muted-foreground"
                      }`}>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </button>
                  ))}
              </div>

              {/* Extra Roti Section */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-1">Extra Roti 🫓</h3>
                <p className="text-muted-foreground font-body text-sm mb-4">4 roti included • ₹10 me 2 extra roti</p>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setExtraRoti(Math.max(0, extraRoti - 1))}
                    disabled={extraRoti === 0}
                    className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary/50 transition-colors disabled:opacity-30">
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <div className="text-center min-w-[80px]">
                    <span className="font-display text-2xl font-bold text-foreground">{totalExtraRoti}</span>
                    <p className="text-xs text-muted-foreground font-body">extra roti</p>
                  </div>
                  <button type="button" onClick={() => setExtraRoti(extraRoti + 1)}
                    className="w-10 h-10 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Plus className="w-4 h-4 text-primary" />
                  </button>
                  {extraRoti > 0 && (
                    <span className="ml-auto text-primary font-body font-bold">+ ₹{extraRotiPrice}</span>
                  )}
                </div>
              </div>
                {selectedItems.length > 0 && (
                  <p className="mt-3 text-sm text-primary font-body font-semibold">
                    {selectedItems.length} item{selectedItems.length > 1 ? "s" : ""} selected
                  </p>
                )}
              </div>

              {/* Contact details */}
              <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
                <h3 className="font-display text-lg font-bold text-foreground">Delivery Details</h3>
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
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Special Instructions</label>
                  <input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g. No onion, extra spicy..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                <UtensilsCrossed className="w-5 h-5" />
                {loading ? "Placing Order..." : `Place Order — ₹${totalPrice}`}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;
