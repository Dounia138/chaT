import { queryOptions, useQueries } from "@tanstack/react-query";

import { supabase } from "../../../shared/utils/supabase/supabase";

const getUsername = (userId: string) => {
  return supabase
    .from("usernames_view")
    .select("*")
    .eq("id", userId)
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data[0];
    });
};

export const useUsernames = (userIds: string[]) => {
  const userIdsWithoutDuplicates = Array.from(new Set(userIds));

  return useQueries({
    queries: userIdsWithoutDuplicates.map((userId) =>
      queryOptions({
        queryKey: ["users", userId],
        queryFn: async () => {
          return getUsername(userId);
        },
      }),
    ),
  });
};
