import { VStack, Text } from "@gluestack-ui/themed";

import { UserSearchBar } from "./components/user-search-bar";
import { useSearchUsers } from "./hooks/use-search-users";
import { DefaultLayout } from "../../layouts/default-layout";
import { DiscussionButton } from "../home/components/discussion-button";

export const NewDiscussionScreen = () => {
  const searchUsers = useSearchUsers();

  return (
    <DefaultLayout>
      <UserSearchBar
        onSearch={(searchTerm) => searchUsers.mutate(searchTerm)}
      />

      <VStack space="md" height="100%">
        {searchUsers.data?.map((user) => (
          <DiscussionButton key={user.id} userId={user.id} messages={[]} />
        ))}
      </VStack>
    </DefaultLayout>
  );
};
