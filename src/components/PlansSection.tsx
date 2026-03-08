import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Lunch Only",
    price: "₹1,500",
    period: "/month",
    features: ["Daily Lunch Tiffin", "4 Roti + Rice + Dal + Sabzi", "Salad & Pickle", "Home Delivery", "Monday to Saturday"],
    popular: false,
  },
  {
    name: "Full Day Meal",
    price: "₹2,500",
    period: "/month",
    features: ["Lunch + Dinner Tiffin", "4 Roti + Rice + Dal + Sabzi", "Salad, Pickle & Raita", "Home Delivery", "Monday to Sunday", "Sunday Special Thali"],
    popular: true,
  },
  {
    name: "Dinner Only",
    price: "₹1,500",
    period: "/month",
    features: ["Daily Dinner Tiffin", "4 Roti + Rice + Dal + Sabzi", "Raita or Papad", "Home Delivery", "Monday to Saturday"],
    popular: false,
  },
];

const PlansSection = () => {
  return (
    <section id="plans" className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body font-semibold uppercase tracking-widest mb-2">Subscription Plans</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Affordable <span className="text-primary">Monthly</span> Plans
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Choose a plan that suits your needs. No commitment — cancel anytime!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 transition-all ${
                plan.popular
                  ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                  : "bg-card border border-border hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-spice-gold text-deep-brown px-4 py-1 rounded-full font-body font-bold text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" /> Most Popular
                </div>
              )}

              <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="font-display text-4xl font-bold">{plan.price}</span>
                <span className={`font-body text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 font-body text-sm">
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-spice-gold" : "text-secondary"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-body font-bold transition-all ${
                  plan.popular
                    ? "bg-spice-gold text-deep-brown hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                Subscribe Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
