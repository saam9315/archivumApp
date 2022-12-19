import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import LinkingConfiguration from "../navigation/LinkingConfiguration";
import { ActivityIndicator, useColorScheme } from "react-native";
import { isLoadingAtom, userTokenAtom } from "../stores/Atoms";
import { useRecoilValue } from "recoil";

export const Router = () => {
  const colorScheme = useColorScheme();
  const userToken = useRecoilValue(userTokenAtom);
  const isLoading = useRecoilValue(isLoadingAtom);

  if (isLoading) {
    return <ActivityIndicator color={"#000"} animating={true} size="small" />;
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
