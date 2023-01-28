import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSetRecoilState } from "recoil";
import Colors from "../constants/Colors";
import { useAuth } from "../contexts/Auth";
import LoginIllustraion from "../components/Login/LoginIllusatration";
import LoginPageFooterIcon from "../components/Login/LoginPageFooterIcon";
import LoginPageHeader from "../components/Login/LoginPageHeader";
import { isLoadingAtom } from "../stores/Atoms";

export default function LoginScreen() {
  const setIsLoading = useSetRecoilState(isLoadingAtom);
  const auth = useAuth();

  const login = async () => {
    setIsLoading(true);
    await auth.signIn();
  };

  const colorScheme = useColorScheme();
  const headerTextColor = colorScheme === "dark" ? "white" : "black";
  const illustrationContainerBgC = colorScheme === "dark" ? "#161f28" : "white";
  const loginButtonContainerBgC = colorScheme === "dark" ? "#161f28" : "white";
  const mainContainerBgC =
    colorScheme === "dark"
      ? Colors.dark.containerBackground
      : Colors.light.containerBackground;

  return (
    <SafeAreaView
      style={[styles.mainContainer, { backgroundColor: mainContainerBgC }]}
    >
      <LoginPageHeader />

      <View
        style={[
          styles.ilustrationContainer,
          { backgroundColor: illustrationContainerBgC },
        ]}
      >
        <Text style={[styles.headerText, { color: headerTextColor }]}>
          Cool down your Hot data with Archivum
        </Text>

        <LoginIllustraion></LoginIllustraion>
        <View
          style={[
            styles.loginButtonContainer,
            { backgroundColor: loginButtonContainerBgC },
          ]}
        >
          <Pressable
            style={styles.loginButton}
            onPress={() => {
              login();
            }}
          >
            <Text style={styles.loginButtonText}>Login with Azure</Text>
          </Pressable>
        </View>
      </View>
      <LoginPageFooterIcon />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "",
  },
  headerText: {
    fontSize: 35,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: "500",
    top: -40,
    textAlign: "center",
    fontFamily: "Muli-Bold",
  },
  ilustrationContainer: {
    width: "80%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  ilustration: {
    width: 300,
    height: 250,
    borderRadius: 50,
    resizeMode: "contain",
  },
  loginButtonContainer: {
    width: "100%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    bottom: -40,
  },
  loginButton: {
    width: "80%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e7cf2",
  },
  loginButtonText: {
    fontSize: 20,
    fontFamily: "Muli-Bold",
    color: "#fff",
  },
});
