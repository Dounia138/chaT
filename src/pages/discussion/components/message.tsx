import { View, Text, Box, Icon, HStack } from "@gluestack-ui/themed";
import { EditIcon, PencilIcon, TrashIcon } from "lucide-react-native";

import { SwipeableButtons } from "../../../shared/components/swipeable-buttons";
import { useCurrentUser } from "../../../shared/hooks/use-current-user";
import { useUsername } from "../../../shared/hooks/use-username";
import { Message as IMessage } from "../../home/types/message";
import { useDeleteMessage } from "../hooks/use-delete-message";

interface MessageProps {
  message: IMessage;
  setMessageEditing: (id: number) => void;
  messageEditing: number | null;
}

export const Message = ({
  message,
  setMessageEditing,
  messageEditing,
}: MessageProps) => {
  const currentUser = useCurrentUser();

  const senderId = message.from_user_id;

  const username = useUsername(senderId);

  const justifyContent =
    senderId === currentUser.data?.id ? "flex-end" : "flex-start";
  const textAlign = senderId === currentUser.data?.id ? "right" : "left";
  const flexDirection =
    senderId === currentUser.data?.id ? "row-reverse" : "row";

  const deleteMessage = useDeleteMessage();

  const renderedMessage = (
    <View width="100%" flexDirection="row" justifyContent={justifyContent}>
      <Box width="75%">
        <Text textAlign={textAlign} fontWeight="bold" marginBottom="$1">
          {username.data?.name}
        </Text>
        <HStack
          flexDirection={flexDirection}
          alignItems="center"
          marginBottom="$3"
          space="sm"
        >
          <View
            backgroundColor="$backgroundLight0"
            padding="$3"
            rounded="$md"
            flex={1}
          >
            <Text textAlign={textAlign}>{message.message}</Text>
          </View>
          {messageEditing === message.id && <Icon as={PencilIcon} size="xs" />}
        </HStack>
      </Box>
    </View>
  );

  const isMyOwnMessage = senderId === currentUser.data?.id;
  if (!isMyOwnMessage) {
    return renderedMessage;
  }

  return (
    <SwipeableButtons
      buttons={[
        {
          color: "$red600",
          icon: TrashIcon,
          onPress() {
            deleteMessage.mutate(message.id);
          },
        },
        {
          color: "$blue600",
          icon: EditIcon,
          onPress() {
            setMessageEditing(message.id);
          },
        },
      ]}
    >
      {renderedMessage}
    </SwipeableButtons>
  );
};
