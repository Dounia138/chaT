import { View, Text, Box } from "@gluestack-ui/themed";
import { EditIcon, TrashIcon } from "lucide-react-native";

import { SwipeableButtons } from "../../../shared/components/swipeable-buttons";
import { useCurrentUser } from "../../../shared/hooks/use-current-user";
import { useUsername } from "../../../shared/hooks/use-username";
import { Message as IMessage } from "../../home/types/message";
import { useDeleteMessage } from "../hooks/use-delete-message";

interface MessageProps {
  message: IMessage;
}

export const Message = ({ message }: MessageProps) => {
  const currentUser = useCurrentUser();

  const senderId = message.from_user_id;

  const username = useUsername(senderId);

  const justifyContent =
    senderId === currentUser.data?.id ? "flex-end" : "flex-start";
  const textAlign = senderId === currentUser.data?.id ? "right" : "left";

  const deleteMessage = useDeleteMessage();

  return (
    <SwipeableButtons
      buttons={[
        {
          color: "red",
          icon: TrashIcon,
          onPress() {
            deleteMessage.mutate(message.id);
          },
        },
        {
          color: "blue",
          icon: EditIcon,
          onPress() {
            console.log("edit");
          },
        },
      ]}
    >
      <View width="100%" flexDirection="row" justifyContent={justifyContent}>
        <Box width="75%">
          <Text textAlign={textAlign}>{username.data?.name}</Text>
          <View backgroundColor="primary" padding="$1" borderRadius="$md">
            <Text textAlign={textAlign}>{message.message}</Text>
          </View>
        </Box>
      </View>
    </SwipeableButtons>
  );
};
