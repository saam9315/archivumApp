import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import FileUploadModal from '../screens/FileUploadModal';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();


export const AppStack = () => {
  const themeMode = useColorScheme();
  const headerBackgroundColor = themeMode === 'dark' ? "#1d2a38" : "#eaecf5";
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false, animationTypeForReplace: 'push', animation: 'slide_from_right' }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal', title: 'File Upload', headerStyle: { backgroundColor: headerBackgroundColor } }}>
        <Stack.Screen name="FileUploadModal" component={FileUploadModal} />
      </Stack.Group>
    </Stack.Navigator>
  )
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();


