import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import KeyParameterForm from '../components/FileUploadView/KeyParameterForm';
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
/*<View style={styles.container}>
<Text style={styles.title}>This screen doesn't exist.</Text>
<TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
  <Text style={styles.linkText}>Go to home screen!</Text>
</TouchableOpacity>
</View>*/

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
