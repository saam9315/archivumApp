import { FontAwesome } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function cacheImages(images: any) {
    return images.map((image: string | any) => {
      return Asset.fromModule(image).downloadAsync();
    });
  }

  function cacheFonts(fonts: any) {
    return fonts.map((font: string | Record<string, Font.FontSource> | any) =>
      Font.loadAsync(font)
    );
  }

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "Muli-Bold": require("../assets/fonts/Muli-Bold.ttf"),
          "Muli-Regular": require("../assets/fonts/Muli-Regular.ttf"),
        });
        const imageAssets = cacheImages([
          require("../assets/images/fav-icon_with-bg.png"),
          require("../assets/images/archivum-illustration.svg"),
          require("../assets/images/mobilabLogoDark.png"),
          require("../assets/images/mobilabLogoLight.png"),
          require("../assets/images/mobilabLogoLight.png"),
        ]);
        const fontAssets = cacheFonts([
          { "Muli-Bold": require("../assets/fonts/Muli-Bold.ttf") },
          { "Muli-Regular": require("../assets/fonts/Muli-Regular.ttf") },
        ]);

        await Promise.all([...imageAssets, ...fontAssets]);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
