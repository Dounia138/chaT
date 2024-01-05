import {
  Button,
  ButtonIcon,
  ButtonText,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  VStack,
} from "@gluestack-ui/themed";
import { MailIcon, KeyIcon, LogInIcon } from "lucide-react-native";
import { useEffect, useReducer } from "react";

import { useLogin } from "./hooks/use-login";
import { LoginData } from "./types/login-data";
import { DefaultLayout } from "../../layouts/default-layout";
import { useNavigation } from "../../shared/hooks/use-navigation";

export const LoginScreen = () => {
  const navigation = useNavigation();

  const [identifiers, setIdentifiers] = useReducer(
    (state: LoginData, newState: Partial<LoginData>) => ({
      ...state,
      ...newState,
    }),
    {
      email: "",
      password: "",
    },
  );

  const login = useLogin();

  useEffect(() => {
    if (login.isSuccess) {
      navigation.replace("home");
    }
  }, [login.isSuccess]);

  return (
    <DefaultLayout>
      <VStack space="md" justifyContent="center" height="100%">
        <Input variant="outline" size="md">
          <InputField
            placeholder="Email"
            onChangeText={(text) => setIdentifiers({ email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputSlot paddingRight="$1.5">
            <InputIcon as={MailIcon} />
          </InputSlot>
        </Input>

        <Input variant="outline" size="md">
          <InputField
            placeholder="Password"
            onChangeText={(text) => setIdentifiers({ password: text })}
            secureTextEntry
            type="password"
            autoCapitalize="none"
          />
          <InputSlot paddingRight="$1.5">
            <InputIcon as={KeyIcon} />
          </InputSlot>
        </Input>

        <Button
          variant="solid"
          size="md"
          onPress={() => login.mutate(identifiers)}
        >
          <ButtonText>Login </ButtonText>
          <ButtonIcon as={LogInIcon} />
        </Button>

        <Button
          variant="link"
          size="md"
          onPress={() => navigation.replace("signup")}
        >
          <ButtonText>Don't have an account? Signup</ButtonText>
        </Button>
      </VStack>
    </DefaultLayout>
  );
};
