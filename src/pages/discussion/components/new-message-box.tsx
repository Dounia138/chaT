import {
  Button,
  ButtonIcon,
  HStack,
  Icon,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from "@gluestack-ui/themed";
import { SendIcon, XCircleIcon } from "lucide-react-native";
import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";

import { useEditMessage } from "../hooks/use-edit-message";

interface NewMessageBoxProps {
  onSubmit: (message: string) => void;
  messageEditing?: number | null;
  setMessageEditing?: (id: null) => void;
}

export const NewMessageBox = ({
  onSubmit,
  messageEditing,
  setMessageEditing,
}: NewMessageBoxProps) => {
  const [message, setMessage] = useState("");

  const editMessage = useEditMessage();

  const handleSubmit = useCallback(() => {
    if (messageEditing) {
      setMessageEditing?.(null);
      editMessage.mutate({ messageId: messageEditing, message });
    } else {
      onSubmit(message);
    }

    setMessage("");
  }, [message, messageEditing, setMessageEditing, onSubmit]);

  return (
    <VStack backgroundColor="$backgroundLight0" padding="$3" rounded="$md">
      {messageEditing && (
        <HStack
          justifyContent="space-between"
          alignItems="center"
          padding="$3"
          marginBottom="$3"
          backgroundColor="$backgroundLight200"
          rounded="$sm"
        >
          <Text fontSize="$sm">Editing</Text>
          <TouchableOpacity
            onPress={() => {
              setMessageEditing?.(null);
            }}
          >
            <Icon as={XCircleIcon} />
          </TouchableOpacity>
        </HStack>
      )}
      <HStack>
        <Textarea flex={1}>
          <TextareaInput
            placeholder="Message"
            onChangeText={setMessage}
            value={message}
          />
        </Textarea>
        <Button onPress={handleSubmit} height="100%" marginLeft="$3">
          <ButtonIcon as={SendIcon} />
        </Button>
      </HStack>
    </VStack>
  );
};
