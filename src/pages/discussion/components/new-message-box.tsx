import {
  Button,
  ButtonIcon,
  HStack,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { SendIcon } from "lucide-react-native";
import { useState } from "react";

interface NewMessageBoxProps {
  onSubmit: (message: string) => void;
}

export const NewMessageBox = ({ onSubmit }: NewMessageBoxProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onSubmit(message);
    setMessage("");
  };

  return (
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
  );
};
