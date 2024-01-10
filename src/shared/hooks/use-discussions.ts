import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useReducer } from "react";

import { useCurrentUser } from "./use-current-user";
import { Message } from "../../pages/home/types/message";
import { supabase } from "../utils/supabase/supabase";

const useListenToMessages = (
  userId: string | undefined,
  callback: (data: Message) => void,
) => {
  useEffect(() => {
    if (!userId) {
      return;
    }

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          callback(payload.new as Message);
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, callback]);
};

const useGroupMessagesToDiscussions = (messages: Message[]) => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const discussions = useMemo(() => {
    return messages.reduce<Map<string, Message[]>>((acc, message) => {
      const key =
        message.user1_id === currentUser.data?.id
          ? message.user2_id
          : message.user1_id;

      if (acc.has(key)) {
        return acc.set(key, [...(acc.get(key) ?? []), message]);
      }

      return acc.set(key, [message]);
    }, new Map());
  }, [messages]);

  discussions.forEach((messages, receiverId) => {
    queryClient.setQueryData(["discussions", receiverId], messages);
  });

  return discussions;
};

const getMessages = (userId: string) => {
  return supabase
    .from("messages")
    .select("*")
    .or(`user1_id.eq."${userId}",user2_id.eq."${userId}"`)
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data as Message[];
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

export const useDiscussions = (userId: string | undefined) => {
  // Create a store of messages
  const [messages, setMessages] = useReducer(
    (prev: Message[], next: Message[]) => {
      return [...prev, ...next].filter(
        (message, index, self) =>
          index === self.findIndex((m) => m.id === message.id),
      );
    },
    [],
  );

  // Initially load messages
  const messagesQuery = useMessages(userId);
  useEffect(() => {
    if (messagesQuery.data) {
      setMessages(messagesQuery.data);
    }
  }, [messagesQuery.data]);

  // Listen to new messages
  useListenToMessages(userId, (data) => {
    setMessages([data]);
  });

  // Group messages to discussions
  return useGroupMessagesToDiscussions(messages);
};
