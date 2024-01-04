import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../pages/home/home-screen";
import { SignupScreen } from "../pages/signup/signup-screen";

export type RootStackParamList = {
  signup: undefined;
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
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
