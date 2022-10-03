import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import ContainerList from '../modules/Container/ContainerList';
import { useRecoilValue } from 'recoil';
import { isLoadingAtom } from '../stores/Atoms';


export default function HomeScreen() {
  const themeMode = useColorScheme();
  const containerBgC = themeMode === 'dark' ? "#1d2a38" : "#eaecf5";
  const isLoading = useRecoilValue(isLoadingAtom);

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

