import { Box, Icon, View } from "@gluestack-ui/themed";
import { createLucideIcon } from "lucide-react-native";
import React from "react";
import { Animated, TouchableOpacity } from "react-native";
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
        renderRightActions={(progress, dragX, swipeable) => {
          // Utilisez les valeurs progress et dragX pour ajuster l'apparence des éléments à droite
          const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <View flexDirection="row">
              <Box width="$3" />
              {buttons.map((button, i) => (
                <Box marginHorizontal="$1" key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      button.onPress();
                      swipeable.close();
                    }}
                  >
                    <Animated.View
                      style={{
                        transform: [{ scale }],
                      }}
                    >
                      <Box
                        backgroundColor={button.color}
                        padding="$3"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        aspectRatio={1}
                        rounded="$md"
                      >
                        <Icon as={button.icon} color="white" />
                      </Box>
                    </Animated.View>
                  </TouchableOpacity>
                </Box>
              ))}
            </View>
          );
        }}
      >
        <View backgroundColor="$backgroundLight100">{children}</View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
