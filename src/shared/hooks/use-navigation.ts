import {
  useNavigation as _useNavigation,
  NavigationContainerRef,
  StackActions,
} from "@react-navigation/native";

import { RootStackParamList } from "../../router/router";

export const useNavigation = () => {
  const navigation =
    _useNavigation<NavigationContainerRef<RootStackParamList>>();

  const navigationReplace = <T extends keyof RootStackParamList>(
    name: T,
    params?: RootStackParamList[T],
  ) => {
    navigation.dispatch(StackActions.replace(name, params));
  };

  return {
    ...navigation,
    replace: navigationReplace,
  };
};
