import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import KeyParameterInputScreen from "../screens/KeyParameterInputScreen";
import FileUploadScreen from "../screens/FileUploadScreen";
import { useColorScheme, Image, Pressable, StyleSheet } from "react-native";
import EntitiesTableScreen from "../screens/EntitiesTableScreen";
import { useAuth } from "../contexts/Auth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  const themeMode = useColorScheme();
  const headerBackgroundColor = themeMode === "dark" ? "#1d2a38" : "#eaecf5";
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          title: "Home",
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="FileUploadScreen"
          component={FileUploadScreen}
          options={{
            title: "Step 1: Select a File",
            headerStyle: { backgroundColor: headerBackgroundColor },
          }}
        />
        <Stack.Screen
          name="KeyParameterInputScreen"
          component={KeyParameterInputScreen}
          options={{
            title: "Step 2: File Details",
            headerStyle: { backgroundColor: headerBackgroundColor },
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="EntitiesTableScreen"
        component={EntitiesTableScreen}
        options={() => ({
          title: "Entites",
          headerStyle:
            themeMode === "dark"
              ? { backgroundColor: "#1d2a38" }
              : { backgroundColor: "#eaecf5" },
          headerTitle: () => (
            <Image
              source={require("../assets/images/fav-icon_with-bg.png")}
              fadeDuration={0}
              style={styles.headerIcon}
            />
          ),
          tabBarIcon: ({ color }: any) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={signOut}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialCommunityIcons
                style={{ marginRight: 15 }}
                name="logout"
                size={24}
                color="grey"
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    width: 30,
    height: 30,
    top: -6,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});

const BottomTab = createBottomTabNavigator<RootTabParamList>();
