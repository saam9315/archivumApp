import React from 'react';
import { Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import KeyParameterForm from '../components/FileUploadView/KeyParameterForm';
import { KeyParameter } from '../types';
import ImageComponent from '../components/FileUploadView/ImageComponent';


export default function FileUploadModal({ route }: any) {
  const containerParameters: KeyParameter[] = route.params.requiredParameters
  const { displayName } = route.params
  const colorScheme = useColorScheme();
  const containerBackgroundColor = colorScheme === 'dark' ? "#161f28" : '#eaecf5';
  //console.log(containerParameters);


  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }]}>
      <Text style={styles.title}>{displayName}</Text>
      <View style={styles.separator} lightColor="black" darkColor='grey' />
      <ImageComponent></ImageComponent>
      <KeyParameterForm containerParameters={containerParameters} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '75%',
  },
});
