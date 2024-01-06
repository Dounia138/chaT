import { useQuery } from "@tanstack/react-query";

export const useDiscussion = (receiverId: string) => {
  return useQuery({
    queryKey: ["discussions", receiverId],
  });
};
