import { queryOptions, useQuery } from "@tanstack/react-query";

import { supabase } from "../utils/supabase/supabase";

const getUsername = (userId: string) => {
  return supabase
    .from("users_view")
    .select("*")
    .eq("id", userId)
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data[0];
    });
};

export const getUseUsernameOptions = (userId: string) => {
  return queryOptions({
    queryKey: ["users", userId],
    queryFn: async () => {
      return getUsername(userId);
    },
  });
};

export const useUsername = (userId: string) => {
  const useQueryOptions = getUseUsernameOptions(userId);

  return useQuery<any>({
    queryKey: useQueryOptions.queryKey,
    queryFn: useQueryOptions.queryFn as any,
  });
};
