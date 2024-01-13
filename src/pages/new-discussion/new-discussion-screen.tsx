import { Box, Divider, VStack } from "@gluestack-ui/themed";
import React from "react";

import { UserSearchBar } from "./components/user-search-bar";
import { useSearchUsers } from "./hooks/use-search-users";
import { DefaultLayout } from "../../layouts/default-layout";
import { DiscussionButton } from "../home/components/discussion-button";

export const NewDiscussionScreen = () => {
  const searchUsers = useSearchUsers();

  return (
    <DefaultLayout>
      <Box marginBottom="$2">
        <UserSearchBar
          onSearch={(searchTerm) => searchUsers.mutate(searchTerm)}
        />
      </Box>

      <VStack space="md" height="100%">
        {searchUsers.data?.map((user, i, arr) => (
          <React.Fragment key={user.id}>
            <DiscussionButton messages={[]} userId={user.id} />
            {i !== arr.length - 1 && (
              <Divider marginTop="$2" marginBottom="$2" />
            )}
          </React.Fragment>
        ))}
      </VStack>
    </DefaultLayout>
  );
};
