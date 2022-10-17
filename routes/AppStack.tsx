import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList, RootTabParamList } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "../navigation/BottomTabNavigator";
import KeyParameterInputScreen from "../screens/KeyParameterInputScreen";
import FileUploadScreen from "../screens/FileUploadScreen";
import { useColorScheme } from "react-native";
import EntitiesTableScreen from "../screens/EntitiesTableScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppStack = () => {
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
        options={{
          title: "Entities table",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();
