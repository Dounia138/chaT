import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { useCurrentUser } from "../../../shared/hooks/use-current-user";

export const useDiscussions = (messages: any[]) => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const discussions = useMemo(() => {
    return messages.reduce<Map<string, any>>((acc, message) => {
      const key =
        message.user1_id === currentUser.data?.id
          ? message.user2_id
          : message.user1_id;

      if (acc.has(key)) {
        return acc.set(key, [...acc.get(key), message]);
      }

      return acc.set(key, [message]);
    }, new Map());
  }, [messages]);

  discussions.forEach((messages, receiverId) => {
    queryClient.setQueryData(["discussions", receiverId], messages);
  });

  return discussions;
};
