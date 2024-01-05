import { useQuery } from "@tanstack/react-query";

import { supabase } from "../utils/supabase/supabase";

const getCurrentUser = () => {
  return supabase.auth.getUser().then((res) => {
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data.user;
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return getCurrentUser();
    },
    gcTime: 0,
  });
};
