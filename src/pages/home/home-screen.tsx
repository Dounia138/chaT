import { Divider, Icon, ScrollView, VStack } from "@gluestack-ui/themed";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MessageCirclePlusIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { DiscussionButton } from "./components/discussion-button";
import { useUsernames } from "./hooks/use-usernames";
import { DefaultLayout } from "../../layouts/default-layout";
import { RootStackParamList } from "../../router/router";
import { useCurrentUser } from "../../shared/hooks/use-current-user";
import { useDiscussions } from "../../shared/hooks/use-discussions";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight(props) {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("newDiscussion")}
          >
            <Icon as={MessageCirclePlusIcon} color="$primary500" size="xl" />
          </TouchableOpacity>
        );
      },
    });
  }, []);

  const currentUser = useCurrentUser();

  const { discussions } = useDiscussions(currentUser.data?.id);

  const allUserIds = Array.from(discussions?.entries() ?? [])
    .map(([userId, messages]) => [
      userId,
      ...messages.map((m) => [m.from_user_id, m.to_user_id]),
    ])
    .flat(2);
  useUsernames(allUserIds);

  return (
    <DefaultLayout>
      <ScrollView>
        <VStack>
          {Array.from(discussions?.entries() ?? [])
            .sort(([, messagesA], [, messagesB]) => {
              const lastMessageA = messagesA.at(-1);
              const lastMessageB = messagesB.at(-1);

              if (!lastMessageA || !lastMessageB) {
                return 0;
              }

              const lastMessageDateA = new Date(lastMessageA.created_at);
              const lastMessageDateB = new Date(lastMessageB.created_at);

              return lastMessageDateB.getTime() - lastMessageDateA.getTime();
            })
            .map(([userId, messages], i, arr) => {
              return (
                <React.Fragment key={userId}>
                  <DiscussionButton messages={messages} userId={userId} />
                  {i !== arr.length - 1 && (
                    <Divider marginTop="$2" marginBottom="$2" />
                  )}
                </React.Fragment>
              );
            })}
        </VStack>
      </ScrollView>
    </DefaultLayout>
  );
};
