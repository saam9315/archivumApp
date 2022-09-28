import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import KeyParameterInputScreen from '../screens/KeyParameterInputScreen';
import FileUploadScreen from '../screens/FileUploadScreen';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();


export const AppStack = () => {
  const themeMode = useColorScheme();
  const headerBackgroundColor = themeMode === 'dark' ? "#1d2a38" : "#eaecf5";
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ title: 'Home', headerShown: false, animationTypeForReplace: 'push', animation: 'slide_from_right' }} />
      <Stack.Group>
        <Stack.Screen name="FileUploadScreen" component={FileUploadScreen} options={{ title: 'Select a File ', headerStyle: { backgroundColor: headerBackgroundColor } }} />
        <Stack.Screen name="KeyParameterInputScreen" component={KeyParameterInputScreen} options={{ title: 'File Details', headerStyle: { backgroundColor: headerBackgroundColor } }} />
      </Stack.Group>
    </Stack.Navigator>
  )
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();


