import React from 'react';
import { Button, Pressable, StyleSheet, Image, SafeAreaView, TouchableOpacity, useColorScheme } from 'react-native';
import LoginPageFooterIcon from '../components/LoginPageFooterIcon';
import LoginPageHeader from '../components/LoginPageHeader';
import LoginPageIllustrationModal from '../components/LoginPageIllustrationModal';


export default function LoginScreen() {

  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={colorScheme === 'dark'
      ? styles.mainContainerDark
      : styles.mainContainerLight}
    >
      <LoginPageHeader />
      <LoginPageIllustrationModal />
      <LoginPageFooterIcon />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainerLight: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaecf5',
  },
  mainContainerDark: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161f28',
  },
});
