import { Button, ButtonIcon, ButtonText, VStack } from "@gluestack-ui/themed";
import { MessageCirclePlusIcon } from "lucide-react-native";

import { DiscussionButton } from "./components/discussion-button";
import { useUsernames } from "./hooks/use-usernames";
import { DefaultLayout } from "../../layouts/default-layout";
import { useCurrentUser } from "../../shared/hooks/use-current-user";
import { useDiscussions } from "../../shared/hooks/use-discussions";
import { useNavigation } from "../../shared/hooks/use-navigation";

export const HomeScreen = () => {
  const navigation = useNavigation();

  const currentUser = useCurrentUser();

  const discussions = useDiscussions(currentUser.data?.id);

  const allUserIds = Array.from(discussions?.entries() ?? []).flatMap(
    ([userId, messages]) => [userId, ...messages.map((m) => m.id)],
  );
  useUsernames(allUserIds);

  return (
    <DefaultLayout>
      <VStack>
        <Button
          variant="solid"
          onPress={() => {
            navigation.navigate("newDiscussion");
          }}
        >
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
