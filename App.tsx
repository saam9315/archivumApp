import { StatusBar } from "expo-status-bar";
import React, { Suspense } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "./contexts/Auth";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { Router } from "./routes/Router";
import { RootSiblingParent } from "react-native-root-siblings";
import SearchBar from "./modules/Container/SearchBar";
import { View } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const listContainerBgC = colorScheme === "dark" ? "#161f28" : "white";

  if (!isLoadingComplete) {
    return (
      <ActivityIndicator
        color={colorScheme === "dark" ? "white" : "black"}
        animating={true}
        size="small"
      />
    );
  } else {
    return (
      <RootSiblingParent>
        <RecoilRoot>
          <AuthProvider>
            <Suspense
              fallback={
                <View
                  style={{
                    flex: 1,
                    backgroundColor: listContainerBgC,
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <ActivityIndicator
                    color={colorScheme === "dark" ? "#15e8dd" : "#2f95dc"}
                    animating={true}
                    size="large"
                  />
                </View>
              }
            >
              <SafeAreaProvider>
                <Router />
                <StatusBar />
              </SafeAreaProvider>
            </Suspense>
          </AuthProvider>
        </RecoilRoot>
      </RootSiblingParent>
    );
  }
}
