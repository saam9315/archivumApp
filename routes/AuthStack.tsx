import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/LoginScreen';


const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={SignInScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
