import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../pages/login/login-screen";

export type RootStackParamList = {
  login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
