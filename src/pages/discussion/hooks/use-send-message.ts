import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useCurrentUser } from "../../../shared/hooks/use-current-user";
import { supabase } from "../../../shared/utils/supabase/supabase";

const sendMessage = (message: string, senderId: string, receiverId: string) => {
  return supabase
    .from("messages")
    .insert([{ message, from_user_id: senderId, to_user_id: receiverId }])
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    });
};

export const useSendMessage = (receiverId: string) => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUser();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!currentUser) {
        throw new Error("User is not defined");
      }

      return sendMessage(message, currentUser.id, receiverId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussions", receiverId],
      });
    },
  });
};
