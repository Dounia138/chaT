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
import { UserIcon, MailIcon, KeyIcon, LogInIcon } from "lucide-react-native";
import { useEffect, useReducer } from "react";

import { useSignup } from "./hooks/use-signup";
import { SignupData } from "./types/signup-data";
import { DefaultLayout } from "../../layouts/default-layout";
import { useNavigation } from "../../shared/hooks/use-navigation";

export const SignupScreen = () => {
  const navigation = useNavigation();

  const [identifiers, setIdentifiers] = useReducer(
    (state: SignupData, newState: Partial<SignupData>) => ({
      ...state,
      ...newState,
    }),
    {
      email: "",
      password: "",
      name: "",
    },
  );

  const signup = useSignup();

  useEffect(() => {
    if (signup.isSuccess) {
      navigation.replace("home");
    }
  }, [signup.isSuccess]);

  return (
    <DefaultLayout>
      <VStack space="md" justifyContent="center" height="100%">
        <Input variant="outline" size="md">
          <InputField
            placeholder="Name"
            onChangeText={(text) => setIdentifiers({ name: text })}
          />
          <InputSlot paddingRight="$1.5">
            <InputIcon as={UserIcon} />
          </InputSlot>
        </Input>

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
          onPress={() => signup.mutate(identifiers)}
        >
          <ButtonText>Signup </ButtonText>
          <ButtonIcon as={LogInIcon} />
        </Button>
      </VStack>
    </DefaultLayout>
  );
};
