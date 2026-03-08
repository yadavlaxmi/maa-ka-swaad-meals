import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { ShoppingBag, Users, MessageSquare, CalendarCheck, TrendingUp } from "lucide-react";

interface Stats {
  totalOrders: number;
  totalSubscriptions: number;
  totalFeedback: number;
  activeSubscriptions: number;
  todayOrders: number;
}

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, totalSubscriptions: 0, totalFeedback: 0, activeSubscriptions: 0, todayOrders: 0 });
  const [orders, setOrders] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "subscriptions" | "feedback">("orders");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchData();
  }, [user, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    const [ordersRes, subsRes, feedbackRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*").order("created_at", { ascending: false }),
      supabase.from("feedback").select("*").order("created_at", { ascending: false }),
    ]);

    const allOrders = ordersRes.data || [];
    const allSubs = subsRes.data || [];
    const allFeedback = feedbackRes.data || [];

    setOrders(allOrders);
    setSubscriptions(allSubs);
    setFeedbacks(allFeedback);

    setStats({
      totalOrders: allOrders.length,
      totalSubscriptions: allSubs.length,
      totalFeedback: allFeedback.length,
      activeSubscriptions: allSubs.filter((s) => s.status === "active").length,
      todayOrders: allOrders.filter((o) => o.order_date === today).length,
    });

    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Failed to update order:", error);
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, color: "text-primary" },
    { label: "Today's Orders", value: stats.todayOrders, icon: TrendingUp, color: "text-accent" },
    { label: "Total Subscriptions", value: stats.totalSubscriptions, icon: CalendarCheck, color: "text-primary" },
    { label: "Active Subscriptions", value: stats.activeSubscriptions, icon: Users, color: "text-accent" },
    { label: "Total Feedback", value: stats.totalFeedback, icon: MessageSquare, color: "text-primary" },
  ];

  const tabs = [
    { key: "orders" as const, label: "Orders", count: stats.totalOrders },
    { key: "subscriptions" as const, label: "Subscriptions", count: stats.totalSubscriptions },
    { key: "feedback" as const, label: "Feedback", count: stats.totalFeedback },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          🛡️ Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {statCards.map((card) => (
            <div key={card.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <card.icon className={`w-6 h-6 mx-auto mb-2 ${card.color}`} />
              <p className="font-display text-2xl font-bold text-foreground">{card.value}</p>
              <p className="font-body text-xs text-muted-foreground">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 font-body font-semibold text-sm transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Tables */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {activeTab === "orders" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Name</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Phone</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Meal</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Items</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Extra Roti</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Date</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={7} className="p-6 text-center text-muted-foreground font-body">No orders yet</td></tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id} className="border-t border-border">
                        <td className="p-3 font-body text-foreground">{o.name}</td>
                        <td className="p-3 font-body text-foreground">{o.phone}</td>
                        <td className="p-3 font-body text-foreground capitalize">{o.meal_type}</td>
                        <td className="p-3 font-body text-foreground">{o.items?.join(", ")}</td>
                        <td className="p-3 font-body text-foreground">{o.extra_roti * 2}</td>
                        <td className="p-3 font-body text-foreground">{o.order_date}</td>
                        <td className="p-3">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                            className={`px-2 py-1 rounded-lg text-xs font-body font-semibold border-0 cursor-pointer ${
                              o.status === "pending"
                                ? "bg-accent/20 text-accent"
                                : o.status === "preparing"
                                ? "bg-yellow-500/20 text-yellow-600"
                                : "bg-primary/20 text-primary"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="preparing">Preparing</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "subscriptions" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Name</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Phone</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Plan</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Meal</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Start</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length === 0 ? (
                    <tr><td colSpan={6} className="p-6 text-center text-muted-foreground font-body">No subscriptions yet</td></tr>
                  ) : (
                    subscriptions.map((s) => (
                      <tr key={s.id} className="border-t border-border">
                        <td className="p-3 font-body text-foreground">{s.name}</td>
                        <td className="p-3 font-body text-foreground">{s.phone}</td>
                        <td className="p-3 font-body text-foreground capitalize">{s.plan}</td>
                        <td className="p-3 font-body text-foreground capitalize">{s.meal_type}</td>
                        <td className="p-3 font-body text-foreground">{s.start_date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-body font-semibold ${
                            s.status === "active" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                          }`}>{s.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">User ID</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Rating</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Comment</th>
                    <th className="text-left p-3 font-body font-semibold text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-muted-foreground font-body">No feedback yet</td></tr>
                  ) : (
                    feedbacks.map((f) => (
                      <tr key={f.id} className="border-t border-border">
                        <td className="p-3 font-body text-foreground text-xs">{f.user_id.slice(0, 8)}...</td>
                        <td className="p-3 font-body text-foreground">{"⭐".repeat(f.rating)}</td>
                        <td className="p-3 font-body text-foreground">{f.comment || "—"}</td>
                        <td className="p-3 font-body text-foreground">{new Date(f.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
