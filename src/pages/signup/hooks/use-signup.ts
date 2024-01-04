import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../shared/utils/supabase/supabase";
import { SignupData } from "../types/signup-data";

const signup = (data: SignupData) => {
  return supabase.auth
    .signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res;
    });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => {
      return signup(data);
    },
  });
};
