import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useSubscription = () => {
  const { user } = useAuth();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setHasActiveSubscription(false);
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "active")
        .limit(1);

      setHasActiveSubscription((data?.length ?? 0) > 0);
      setLoading(false);
    };

    checkSubscription();
  }, [user]);

  return { hasActiveSubscription, loading };
};
