import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import ContainerList from '../components/ContainerList';
import SearchBar from '../components/SearchBar';
import { useRecoilValue } from 'recoil';
import { isLoadingAtom } from '../stores/Atoms';
import { Loading } from '../components/Loading';


export default function HomeScreen({ navigation }: RootTabScreenProps<'HomeScreen'>) {
  const themeMode = useColorScheme();
  const containerBgC = themeMode === 'dark' ? "#1d2a38" : "#eaecf5";
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBgC }]}>
      {/* <SearchBar /> */}
      <ContainerList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

