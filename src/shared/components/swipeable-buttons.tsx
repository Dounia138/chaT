import { Box, Icon } from "@gluestack-ui/themed";
import { createLucideIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

interface SwipeableButtonsProps extends React.PropsWithChildren {
  buttons: {
    color: string;
    icon: ReturnType<typeof createLucideIcon>;
    onPress: () => void;
  }[];
}

export const SwipeableButtons = ({
  children,
  buttons,
}: SwipeableButtonsProps) => {
  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => {
          return buttons.map((button, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                button.onPress();
              }}
            >
              <Box
                backgroundColor={button.color}
                padding="$3"
                justifyContent="center"
                alignItems="center"
                height="100%"
                aspectRatio={1}
              >
                <Icon as={button.icon} color="white" />
              </Box>
            </TouchableOpacity>
          ));
        }}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
};
