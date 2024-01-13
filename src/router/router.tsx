import { Box, Text, VStack } from "@gluestack-ui/themed";
import NetInfo from "@react-native-community/netinfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DiscussionScreen } from "../pages/discussion/discussion-screen";
import { HomeScreen } from "../pages/home/home-screen";
import { LoginScreen } from "../pages/login/login-screen";
import { NewDiscussionScreen } from "../pages/new-discussion/new-discussion-screen";
import { SignupScreen } from "../pages/signup/signup-screen";
import { useCurrentUser } from "../shared/hooks/use-current-user";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  signup: undefined;
  login: undefined;
  home: undefined;
  discussion: { receiverId: string };
  newDiscussion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser.status !== "pending") {
      SplashScreen.hideAsync();
    }
  }, [currentUser.status]);

  const [showOffline, setShowOffline] = useState(false);

  const safeAreaInsets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setShowOffline(!state.isConnected);
    });

    return unsubscribe;
  }, []);

  if (currentUser.status === "pending") {
    return null;
  }

  return (
    <VStack flex={1}>
      {showOffline && (
        <Box
          backgroundColor="$red500"
          padding="$3"
          paddingTop={safeAreaInsets.top}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Text paddingTop="$3" color="$white" fontWeight="bold">
            Offline
          </Text>
        </Box>
      )}
      <Stack.Navigator initialRouteName={currentUser.data ? "home" : "signup"}>
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
    </VStack>
  );
};
