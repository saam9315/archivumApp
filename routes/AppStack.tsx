import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import ModalScreen from '../screens/ModalScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();


export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();


