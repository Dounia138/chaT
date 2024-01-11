import { useMutation } from "@tanstack/react-query";

import { useCurrentUser } from "../../../shared/hooks/use-current-user";
import { supabase } from "../../../shared/utils/supabase/supabase";

const deleteDiscussion = async (user1Id: string, user2Id: string) => {
  return supabase
    .from("messages")
    .delete()
    .or(
      `and(from_user_id.eq."${user1Id}",to_user_id.eq."${user2Id}"),and(from_user_id.eq."${user2Id}",to_user_id.eq."${user1Id}")`,
    )
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      return res.data;
    });
};

export const useDeleteDiscussion = () => {
  const currentUser = useCurrentUser();

  // const { refetchDiscussions } = useDiscussions(currentUser.data?.id);

  return useMutation({
    mutationFn: async (user2Id: string) => {
      const user1Id = currentUser.data?.id;

      if (!user1Id) {
        throw new Error("User not found");
      }

      await deleteDiscussion(user1Id, user2Id);
      // await refetchDiscussions();
    },
  });
};
