import { useMutation } from "@tanstack/react-query";

import { supabase } from "../../../shared/utils/supabase/supabase";
import { LoginData } from "../types/login-data";

const login = (data: LoginData) => {
  return supabase.auth
    .signInWithPassword({
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res;
    });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => {
      return login(data);
    },
  });
};
