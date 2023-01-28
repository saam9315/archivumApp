import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useColorScheme, Image, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { useAuth } from "../contexts/Auth";
import EntitiesTableScreen from "../screens/EntitiesTableScreen";
import Groups from "../screens/Groups";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import { RootTabParamList, RootTabScreenProps } from "../types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };

  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor:
          colorScheme === "dark" ? Colors.tintColorDark : Colors.tintColorLight,
        tabBarStyle:
          colorScheme === "dark"
            ? { backgroundColor: "#1d2a38" }
            : { backgroundColor: "#eaecf5" },
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"HomeScreen">) => ({
          title: "Home",
          headerStyle:
            colorScheme === "dark"
              ? { backgroundColor: "#1d2a38" }
              : { backgroundColor: "#eaecf5" },
          headerTitle: () => (
            <Image
              source={require("../assets/images/fav-icon_with-bg.png")}
              fadeDuration={0}
              style={styles.headerIcon}
            />
          ),
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
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
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={() => ({
          title: "Search",
          headerStyle:
            colorScheme === "dark"
              ? { backgroundColor: "#1d2a38" }
              : { backgroundColor: "#eaecf5" },
          headerTitle: () => (
            <Image
              source={require("../assets/images/fav-icon_with-bg.png")}
              fadeDuration={0}
              style={styles.headerIcon}
            />
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
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
      <BottomTab.Screen
        name="GroupsScreen"
        component={Groups}
        options={() => ({
          title: "Groups",
          headerStyle:
            colorScheme === "dark"
              ? { backgroundColor: "#1d2a38" }
              : { backgroundColor: "#eaecf5" },
          headerTitle: () => (
            <Image
              source={require("../assets/images/fav-icon_with-bg.png")}
              fadeDuration={0}
              style={styles.headerIcon}
            />
          ),
          tabBarIcon: ({ color }) => (
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
    </BottomTab.Navigator>
  );
}
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
