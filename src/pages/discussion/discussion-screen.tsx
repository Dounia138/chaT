import { Box, ScrollView, VStack, View } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import { Message } from "./components/message";
import { NewMessageBox } from "./components/new-message-box";
import { useDiscussion } from "./hooks/use-discussion";
import { useSendMessage } from "./hooks/use-send-message";
import { DefaultLayout } from "../../layouts/default-layout";
import { RootStackParamList } from "../../router/router";
import { useUsername } from "../../shared/hooks/use-username";

type DiscussionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "discussion"
>;

export const DiscussionScreen = ({
  route,
  navigation,
}: DiscussionScreenProps) => {
  const { receiverId } = route.params;

  const username = useUsername(receiverId);

  useEffect(() => {
    navigation.setOptions({ title: username.data?.name ?? "" });
  }, [username.data?.name]);

  const discussion = useDiscussion(receiverId);
  const sendMessage = useSendMessage(receiverId);

  const [messageEditing, setMessageEditing] = useState<number | null>();

  return (
    <DefaultLayout>
      <VStack height="100%">
        <ScrollView>
          {(discussion.data as any)?.map((message: any) => (
            <Message
              key={message.id}
              message={message}
              messageEditing={messageEditing ?? null}
              setMessageEditing={setMessageEditing}
            />
          ))}
        </ScrollView>
        <Box width="100%" marginVertical="$3">
          <NewMessageBox
            onSubmit={(message) => {
              sendMessage.mutate(message);
            }}
            messageEditing={messageEditing}
            setMessageEditing={setMessageEditing}
          />
        </Box>
      </VStack>
    </DefaultLayout>
  );
};
