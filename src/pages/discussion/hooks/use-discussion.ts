import { useQuery } from "@tanstack/react-query";

import { Message } from "../../home/types/message";

export const useDiscussion = (receiverId: string) => {
  return useQuery<Message[]>({
    queryKey: ["discussions", receiverId],
  });
};
