import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";

import { Navigator } from "./src/router/router";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
