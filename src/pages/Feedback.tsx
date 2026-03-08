import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Send, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Please login first", description: "You need to be logged in to submit feedback.", variant: "destructive" });
      navigate("/auth");
      return;
    }
    if (rating === 0) {
      toast({ title: "Please rate us", description: "Select a star rating before submitting.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("feedback").insert({
      user_id: user.id,
      rating,
      comment: comment.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSubmitted(true);
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
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Give Feedback</h1>
              <p className="text-muted-foreground font-body text-sm">Help us make your food even better</p>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-accent/10 border border-accent/30 rounded-2xl p-10 text-center"
            >
              <Star className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You! 🙏</h3>
              <p className="text-muted-foreground font-body">Your feedback means a lot to us!</p>
              <button
                onClick={() => { setSubmitted(false); setRating(0); setComment(""); }}
                className="mt-6 text-primary font-body font-semibold hover:underline"
              >
                Give Another Feedback
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
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
                      <Star className={`w-10 h-10 transition-colors ${
                        star <= (hoverRating || rating) ? "text-accent fill-accent" : "text-border"
                      }`} />
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
                <label className="font-body text-sm font-semibold text-foreground block mb-1.5">Your Feedback</label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us what you liked or what we can improve..."
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-body font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>

              {!user && (
                <p className="text-center text-sm text-muted-foreground font-body">
                  You need to <Link to="/auth" className="text-primary font-semibold hover:underline">login</Link> to submit feedback.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;
