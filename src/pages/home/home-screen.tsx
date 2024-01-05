import { Button, ButtonIcon, ButtonText, VStack } from "@gluestack-ui/themed";
import { MessageCirclePlusIcon } from "lucide-react-native";

import { DiscussionButton } from "./components/discussion-button";
import { useDiscussions } from "./hooks/use-discussions";
import { useMessages } from "./hooks/use-messages";
import { useUsernames } from "./hooks/use-usernames";
import { DefaultLayout } from "../../layouts/default-layout";
import { useCurrentUser } from "../../shared/hooks/use-current-user";

export const HomeScreen = () => {
  const currentUser = useCurrentUser();

  const messages = useMessages(currentUser.data?.id);
  useUsernames(
    messages.data?.flatMap((message) => [message.user1_id, message.user2_id]) ??
      [],
  );

  const discussions = useDiscussions(messages.data ?? []);

  return (
    <DefaultLayout>
      <VStack>
        <Button variant="solid" onPress={() => {}}>
          <ButtonIcon as={MessageCirclePlusIcon} marginRight="$3" />
          <ButtonText>Start a new conversation</ButtonText>
        </Button>

        {Array.from(discussions?.entries() ?? []).map(([userId, messages]) => {
          return (
            <DiscussionButton
              key={userId}
              messages={messages}
              userId={userId}
            />
          );
        })}
      </VStack>
    </DefaultLayout>
  );
};
