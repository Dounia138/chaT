import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Navigator } from "./src/router/router";

const queryClient = new QueryClient();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </PersistQueryClientProvider>
  );
}
