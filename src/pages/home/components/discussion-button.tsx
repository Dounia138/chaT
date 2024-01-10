import { Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "../../../shared/hooks/use-navigation";
import { useUsername } from "../../../shared/hooks/use-username";
import { Message } from "../types/message";

interface DiscussionButtonProps {
  userId: string;
  messages: Message[];
}

export const DiscussionButton = ({
  userId,
  messages,
}: DiscussionButtonProps) => {
  const navigation = useNavigation();

  const username = useUsername(userId);

  const lastMessage = messages.at(-1);
  const lastMessageDate = lastMessage?.created_at
    ? new Date(lastMessage.created_at)
    : null;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("discussion", { receiverId: userId });
      }}
    >
      <Text>{username.data?.name}</Text>
      <Text>{lastMessage?.message}</Text>
      {lastMessageDate && (
        <Text>
          {lastMessageDate?.getHours().toString().padStart(2, "0")}:
          {lastMessageDate?.getMinutes().toString().padStart(2, "0")}
        </Text>
      )}
    </TouchableOpacity>
  );
};
