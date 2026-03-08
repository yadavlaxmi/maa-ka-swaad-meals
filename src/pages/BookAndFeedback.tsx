import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, UtensilsCrossed, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const mealOptions = [
  { id: "lunch", label: "Lunch Only", price: "₹80/day" },
  { id: "dinner", label: "Dinner Only", price: "₹80/day" },
  { id: "both", label: "Lunch + Dinner", price: "₹150/day" },
];

const planOptions = [
  { id: "weekly", label: "1 Week", discount: "" },
  { id: "15days", label: "15 Days", discount: "5% off" },
  { id: "monthly", label: "1 Month", discount: "10% off" },
];

const BookAndFeedback = () => {
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Maa Ka Swad Logo" className="h-10 w-10" />
            <span className="font-display text-xl font-bold text-foreground">Maa Ka Swad</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-3xl font-bold text-foreground">Book Your Thali</h1>
                <p className="text-muted-foreground font-body text-sm">Fill in your details to start your tiffin</p>
              </div>
            </div>

            {bookingSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-secondary/10 border border-secondary/30 rounded-2xl p-10 text-center"
              >
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Booking Confirmed! 🎉</h3>
                <p className="text-muted-foreground font-body">
                  We'll contact you shortly to confirm your tiffin delivery. Thank you!
                </p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="mt-6 text-primary font-body font-semibold hover:underline"
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Delivery Address *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Your full address for delivery"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-2">Select Meal *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {mealOptions.map((meal) => (
                      <button
                        key={meal.id}
                        type="button"
                        onClick={() => setSelectedMeal(meal.id)}
                        className={`p-3 rounded-xl border-2 text-center transition-all font-body text-sm ${
                          selectedMeal === meal.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/30 text-muted-foreground"
                        }`}
                      >
                        <div className="font-semibold">{meal.label}</div>
                        <div className="text-xs mt-1 text-primary font-bold">{meal.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-2">Select Plan *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {planOptions.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`p-3 rounded-xl border-2 text-center transition-all font-body text-sm ${
                          selectedPlan === plan.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border hover:border-primary/30 text-muted-foreground"
                        }`}
                      >
                        <div className="font-semibold">{plan.label}</div>
                        {plan.discount && (
                          <div className="text-xs mt-1 text-secondary font-bold">{plan.discount}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Special Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. No onion, extra spicy, jain food..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  Book My Thali
                </button>
              </form>
            )}
          </motion.div>

          {/* Feedback Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-spice-gold/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-spice-gold" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground">Give Feedback</h2>
                <p className="text-muted-foreground font-body text-sm">Help us make your food even better</p>
              </div>
            </div>

            {feedbackSubmitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-spice-gold/10 border border-spice-gold/30 rounded-2xl p-10 text-center"
              >
                <Star className="w-16 h-16 text-spice-gold mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You! 🙏</h3>
                <p className="text-muted-foreground font-body">
                  Your feedback means a lot to us. We'll keep improving!
                </p>
                <button
                  onClick={() => { setFeedbackSubmitted(false); setRating(0); }}
                  className="mt-6 text-primary font-body font-semibold hover:underline"
                >
                  Give Another Feedback
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-3">Rate Our Food *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "text-spice-gold fill-spice-gold"
                              : "text-border"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="font-body text-sm text-muted-foreground mt-2">
                      {rating === 1 && "😕 We'll improve!"}
                      {rating === 2 && "🙂 Thanks for the feedback"}
                      {rating === 3 && "😊 Good to hear!"}
                      {rating === 4 && "😄 Glad you liked it!"}
                      {rating === 5 && "🤩 Maa would be proud!"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Which meal did you have?</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                    <option value="">Select meal</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Your Feedback *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you liked or what we can improve..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-spice-gold text-deep-brown py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookAndFeedback;
