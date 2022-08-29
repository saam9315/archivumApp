import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import KeyParameterForm from '../components/FileUploadView/KeyParameterForm';
import { KeyParameter } from '../types';


export default function FileUploadModal({ route }: any) {
  const containerParameters: KeyParameter[] = route.params.requiredParameters
  const { displayName } = route.params
  const colorScheme = useColorScheme();
  const containerBackgroundColor = colorScheme === 'dark' ? "#161f28" : '#eaecf5';
  //console.log(containerParameters);


  return (
    <View style={[styles.mainContainer, {backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5'  }]}>
      <Text style={styles.title}>{displayName}</Text>
      <View style={styles.separator} lightColor="black" darkColor='grey' />
      <View style={[styles.imageContainer, {backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5'  }]}></View>
      <KeyParameterForm containerParameters={containerParameters} />


    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'yellow',
  },
  imageContainer: {
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40%',
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
