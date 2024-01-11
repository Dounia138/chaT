import { Box, Icon, Text } from "@gluestack-ui/themed";
import { TrashIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

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
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => {
          return (
            <TouchableOpacity
              onPress={() => {
                deleteDiscussion.mutate(userId);
              }}
            >
              <Box
                backgroundColor="red"
                padding="$3"
                justifyContent="center"
                alignItems="center"
                height="100%"
                aspectRatio={1}
              >
                <Icon as={TrashIcon} color="white" />
              </Box>
            </TouchableOpacity>
          );
        }}
      >
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
      </Swipeable>
    </GestureHandlerRootView>
  );
};
