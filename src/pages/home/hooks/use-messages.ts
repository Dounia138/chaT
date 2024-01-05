import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../../shared/utils/supabase/supabase";

const getMessages = (userId: string) => {
  return supabase
    .from("messages")
    .select("*")
    .or(`user1_id.eq."${userId}",user2_id.eq."${userId}"`)
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    });
};

export const useMessages = (userId: string | undefined) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["messages", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is not defined");
      }

      return getMessages(userId);
    },
  });
};
