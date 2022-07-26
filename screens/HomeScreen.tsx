import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { RootTabScreenProps } from '../types';
import ContainerList from '../components/ContainerList';


export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {
  const themeMode = useColorScheme();
  const containerBgC = themeMode === 'dark' ? "#1d2a38" : "#eaecf5";



  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBgC }]}>
      <ContainerList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

