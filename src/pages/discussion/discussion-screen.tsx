import { VStack } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Message } from "./components/message";
import { useDiscussion } from "./hooks/use-discussion";
import { DefaultLayout } from "../../layouts/default-layout";
import { RootStackParamList } from "../../router/router";

type DiscussionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "discussion"
>;

export const DiscussionScreen = ({ route }: DiscussionScreenProps) => {
  const { receiverId } = route.params;

  const discussion = useDiscussion(receiverId);

  return (
    <DefaultLayout>
      <VStack>
        {(discussion.data as any)?.map((message: any) => (
          <Message key={message.id} message={message} />
        ))}
      </VStack>
    </DefaultLayout>
  );
};
