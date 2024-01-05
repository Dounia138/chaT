import { Text } from "@gluestack-ui/themed";
import { useQuery } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";

import { Message } from "../types/message";

// import { useCurrentUser } from "../../../shared/hooks/use-current-user";

interface DiscussionButtonProps {
  userId: string;
  messages: Message[];
}

export const DiscussionButton = ({
  userId,
  messages,
}: DiscussionButtonProps) => {
  // const currentUser = useCurrentUser();

  const usernameToDisplay = useQuery<any>({
    queryKey: ["users", userId],
    // We called `useUsernames` in `src/pages/home/home-screen.tsx` so we can
    // omit the `queryFn` here. `usernameToDisplay` will be populated by
    // the cache.
  });

  const lastMessage = messages.at(-1);
  const lastMessageDate = lastMessage?.created_at
    ? new Date(lastMessage.created_at)
    : null;

  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Discussion button pressed");
      }}
    >
      <Text>{usernameToDisplay.data?.username}</Text>
      <Text>{lastMessage?.message}</Text>
      <Text>
        {lastMessageDate?.getHours().toString().padStart(2, "0")}:
        {lastMessageDate?.getMinutes().toString().padStart(2, "0")}
      </Text>
    </TouchableOpacity>
  );
};
