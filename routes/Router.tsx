import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppStack } from './AppStack';
import { AuthStack } from './AuthStack';
import { useAuth } from '../contexts/Auth';
import { Loading } from '../components/Loading';
import LinkingConfiguration from '../navigation/LinkingConfiguration';
import { useColorScheme } from 'react-native';


export const Router = () => {
  const colorScheme = useColorScheme();

  const { authData, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
