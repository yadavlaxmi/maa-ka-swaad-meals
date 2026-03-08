import { motion } from "framer-motion";
import { UtensilsCrossed, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const days = [
  { day: "Monday", lunch: { items: ["Dal Tadka", "Aloo Gobi", "Rice", "Roti (4)", "Salad", "Pickle"] }, dinner: { items: ["Rajma", "Mix Veg", "Rice", "Roti (4)", "Raita"] } },
  { day: "Tuesday", lunch: { items: ["Chole", "Baingan Bharta", "Rice", "Roti (4)", "Salad", "Pickle"] }, dinner: { items: ["Kadhi Pakora", "Aloo Matar", "Rice", "Roti (4)", "Papad"] } },
  { day: "Wednesday", lunch: { items: ["Moong Dal", "Paneer Bhurji", "Rice", "Roti (4)", "Salad", "Pickle"] }, dinner: { items: ["Dal Fry", "Bhindi Masala", "Rice", "Roti (4)", "Raita"] } },
  { day: "Thursday", lunch: { items: ["Arhar Dal", "Shahi Paneer", "Rice", "Roti (4)", "Salad", "Pickle"] }, dinner: { items: ["Chana Dal", "Lauki Sabzi", "Rice", "Roti (4)", "Chutney"] } },
  { day: "Friday", lunch: { items: ["Masoor Dal", "Matar Paneer", "Rice", "Roti (4)", "Salad", "Pickle"] }, dinner: { items: ["Dal Palak", "Tinda Masala", "Rice", "Roti (4)", "Raita"] } },
  { day: "Saturday", lunch: { items: ["Rajma", "Jeera Aloo", "Rice", "Roti (4)", "Salad", "Pickle"] }, dinner: { items: ["Mix Dal", "Gobhi Masala", "Rice", "Roti (4)", "Papad"] } },
  { day: "Sunday", lunch: { items: ["Special Chole Bhature", "Pulao", "Raita", "Sweet", "Salad"] }, dinner: { items: ["Paneer Butter Masala", "Dal Makhani", "Jeera Rice", "Roti (4)", "Gulab Jamun"] } },
];

const MenuSection = () => {
  const { user } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHasSubscription(false);
      setLoading(false);
      return;
    }
    const check = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1);
      setHasSubscription((data?.length ?? 0) > 0);
      setLoading(false);
    };
    check();
  }, [user]);

  if (loading) return null;

  if (!user || !hasSubscription) {
    return (
      <section id="menu" className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <p className="text-primary font-body font-semibold uppercase tracking-widest mb-2">Our Menu</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Weekly <span className="text-primary">Thali</span> Menu
            </h2>
            <div className="max-w-md mx-auto mt-12 bg-card border border-border rounded-2xl p-10">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Subscribers Only</h3>
              <p className="text-muted-foreground font-body mb-6">
                Weekly menu sirf subscribers ke liye hai. Subscribe karein aur har din ka menu dekhein!
              </p>
              <Link to={user ? "/subscribe" : "/auth"}
                className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-body font-bold hover:opacity-90 transition-opacity">
                {user ? "Subscribe Now" : "Login & Subscribe"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-primary font-body font-semibold uppercase tracking-widest mb-2">Our Menu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Weekly <span className="text-primary">Thali</span> Menu
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">Fresh meals prepared daily with love. Menu changes every week!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {days.map((item, i) => (
            <motion.div key={item.day} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-5 border border-border hover:shadow-lg hover:border-primary/30 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{item.day}</h3>
              </div>
              <div className="mb-3">
                <p className="font-body text-sm font-bold text-secondary uppercase tracking-wider mb-1">🌞 Lunch</p>
                <ul className="space-y-0.5">
                  {item.lunch.items.map((food) => (<li key={food} className="font-body text-sm text-muted-foreground">• {food}</li>))}
                </ul>
              </div>
              <div>
                <p className="font-body text-sm font-bold text-destructive uppercase tracking-wider mb-1">🌙 Dinner</p>
                <ul className="space-y-0.5">
                  {item.dinner.items.map((food) => (<li key={food} className="font-body text-sm text-muted-foreground">• {food}</li>))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
