import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../shared/utils/supabase/supabase";

const deleteMessage = async (messageId: number) => {
  supabase
    .from("messages")
    .delete()
    .match({ id: messageId })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    });
};

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: async (messageId: number) => {
      return deleteMessage(messageId);
    },
  });
};
