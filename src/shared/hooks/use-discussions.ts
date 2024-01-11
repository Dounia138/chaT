import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useReducer } from "react";

import { useCurrentUser } from "./use-current-user";
import { Message } from "../../pages/home/types/message";
import { supabase } from "../utils/supabase/supabase";

const useListenToMessages = (
  userId: string | undefined,
  // callback: (data: Message) => void,
  {
    callbackInsert,
    callbackDelete,
  }: {
    callbackInsert: (data: Message) => void;
    callbackDelete: (data: { id: number }) => void;
  },
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
          callbackInsert(payload.new as Message);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "messages" },
        (payload) => {
          callbackDelete(payload.old as { id: number });
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId, callbackInsert, callbackDelete]);
};

const useGroupMessagesToDiscussions = (messages: Message[]) => {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const discussions = useMemo(() => {
    return messages.reduce<Map<string, Message[]>>((acc, message) => {
      const key =
        message.from_user_id === currentUser.data?.id
          ? message.to_user_id
          : message.from_user_id;

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
    .or(`from_user_id.eq."${userId}",to_user_id.eq."${userId}"`)
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
  // const [messages, setMessages] = useReducer(
  //   (prev: Message[], next: Message[]) => {
  //     return [...prev, ...next].filter(
  //       (message, index, self) =>
  //         index === self.findIndex((m) => m.id === message.id),
  //     );
  //   },
  //   [],
  // );
  const [messages, dispatchMessages] = useReducer(
    (
      prev: Message[],
      next:
        | { type: "insert"; payload: Message[] }
        | { type: "delete"; payload: { id: number } },
    ) => {
      if (next.type === "insert") {
        return [...prev, ...next.payload].filter(
          (message, index, self) =>
            index === self.findIndex((m) => m.id === message.id),
        );
      }

      if (next.type === "delete") {
        return prev.filter((message) => message.id !== next.payload.id);
      }

      return prev;
    },
    [],
  );

  // Initially load messages
  const messagesQuery = useMessages(userId);
  useEffect(() => {
    if (messagesQuery.data) {
      dispatchMessages({
        type: "insert",
        payload: messagesQuery.data,
      });
    }
  }, [messagesQuery.data]);

  const addMessage = useCallback(
    (message: Message) => {
      dispatchMessages({
        type: "insert",
        payload: [message],
      });
    },
    [dispatchMessages],
  );

  const deleteMessage = useCallback(
    (message: { id: number }) => {
      dispatchMessages({
        type: "delete",
        payload: message,
      });
    },
    [dispatchMessages],
  );

  // Listen to new messages
  useListenToMessages(userId, {
    callbackInsert: addMessage,
    callbackDelete: deleteMessage,
  });

  // Group messages to discussions
  const discussions = useGroupMessagesToDiscussions(messages);

  return { discussions };
};
