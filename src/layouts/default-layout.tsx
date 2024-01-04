import { Box, ScrollView } from "@gluestack-ui/themed";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DefaultLayoutProps extends PropsWithChildren {}

export const DefaultLayout = (props: DefaultLayoutProps) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Box
      paddingTop={safeAreaInsets.top}
      paddingBottom={safeAreaInsets.bottom}
      paddingHorizontal="$5"
    >
      <ScrollView>{props.children}</ScrollView>
    </Box>
  );
};
