import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DiscussionScreen } from "../pages/discussion/discussion-screen";
import { HomeScreen } from "../pages/home/home-screen";
import { LoginScreen } from "../pages/login/login-screen";
import { NewDiscussionScreen } from "../pages/new-discussion/new-discussion-screen";
import { SignupScreen } from "../pages/signup/signup-screen";

export type RootStackParamList = {
  signup: undefined;
  login: undefined;
  home: undefined;
  discussion: { receiverId: string };
  newDiscussion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: "Your conversations",
          }}
        />
        <Stack.Screen name="discussion" component={DiscussionScreen} />
        <Stack.Screen
          name="newDiscussion"
          component={NewDiscussionScreen}
          options={{
            title: "New Discussion",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
