import { Text, View } from "@gluestack-ui/themed";
import { TrashIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { SwipeableButtons } from "../../../shared/components/swipeable-buttons";
import { useNavigation } from "../../../shared/hooks/use-navigation";
import { useUsername } from "../../../shared/hooks/use-username";
import { useDeleteDiscussion } from "../hooks/use-delete-discussion";
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

  const deleteDiscussion = useDeleteDiscussion();

  return (
    <SwipeableButtons
      buttons={[
        {
          color: "$red600",
          icon: TrashIcon,
          onPress() {
            deleteDiscussion.mutate(userId);
          },
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("discussion", { receiverId: userId });
        }}
      >
        <View backgroundColor="$background" padding="$3">
          <Text fontWeight="bold" marginBottom="$1" fontSize="$lg">
            {username.data?.name}
          </Text>
          <Text>{lastMessage?.message}</Text>
          {lastMessageDate && (
            <Text fontSize="$sm" color="gray" fontWeight="$light">
              {lastMessageDate?.getHours().toString().padStart(2, "0")}:
              {lastMessageDate?.getMinutes().toString().padStart(2, "0")}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </SwipeableButtons>
  );
};
