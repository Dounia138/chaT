import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../pages/home/home-screen";
import { LoginScreen } from "../pages/login/login-screen";
import { SignupScreen } from "../pages/signup/signup-screen";

export type RootStackParamList = {
  signup: undefined;
  login: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
