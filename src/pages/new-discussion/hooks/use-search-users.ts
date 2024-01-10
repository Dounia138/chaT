import { useMutation } from "@tanstack/react-query";

import { useCurrentUser } from "../../../shared/hooks/use-current-user";
import { supabase } from "../../../shared/utils/supabase/supabase";

const searchUsers = async (searchTerm: string) => {
  return supabase
    .from("users_view")
    .select("*")
    .textSearch("email", searchTerm)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      return res.data;
    });
};

export const useSearchUsers = () => {
  const currentUser = useCurrentUser();

  return useMutation({
    mutationFn: async (searchTerm: string) => {
      const foundUser = await searchUsers(searchTerm);

      return foundUser.filter((user) => user.id !== currentUser.data?.id);
    },
  });
};
