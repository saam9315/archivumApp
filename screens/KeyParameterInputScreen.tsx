import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import KeyParameterForm from '../modules/FileUpload/KeyParameterForm';
import { Container } from '../types';

export default function KeyParameterInputScreen({ route }: any) {
  const container: Container = route.params.container;
  const colorScheme = useColorScheme();
  const containerBackgroundColor =
    colorScheme === "dark" ? "#161f28" : "#eaecf5";

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: containerBackgroundColor }]}>
      <KeyParameterForm container={container} />
    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
