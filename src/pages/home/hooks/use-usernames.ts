import { useQueries } from "@tanstack/react-query";

import { getUseUsernameOptions } from "../../../shared/hooks/use-username";

export const useUsernames = (userIds: string[]) => {
  const userIdsWithoutDuplicates = Array.from(new Set(userIds));

  return useQueries({
    queries: userIdsWithoutDuplicates.map((userId) =>
      getUseUsernameOptions(userId),
    ),
  });
};
