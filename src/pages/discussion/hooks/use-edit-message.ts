import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../shared/utils/supabase/supabase";

const editMessage = async (messageId: number, message: string) => {
  return (
    supabase
      .from("messages")
      .update({
        message,
      })
      // .match({ id: messageId })
      .eq("id", messageId)
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message);
        }
        return res.data;
      })
  );
};

export const useEditMessage = () => {
  return useMutation({
    mutationFn: async ({
      messageId,
      message,
    }: {
      messageId: number;
      message: string;
    }) => {
      return editMessage(messageId, message);
    },
  });
};
