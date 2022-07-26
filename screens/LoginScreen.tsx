import { useAutoDiscovery } from 'expo-auth-session';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, useColorScheme, Image, Pressable, Text, View } from 'react-native';
import LoginPageFooterIcon from '../components/LoginPageFooterIcon';
import LoginPageHeader from '../components/LoginPageHeader';
import { useAuth } from '../contexts/Auth';

export default function LoginScreen() {

  const [loading, isLoading] = useState(false);

  const auth = useAuth();

  const login = async () => {
    isLoading(true);
    await auth.signIn();
  };

  const themeMode = useColorScheme();
  const headerTextColor = themeMode === 'dark' ? "white" : "black";
  const illustrationContainerBgC = themeMode === 'dark' ? "#161f28" : "white";
  const loginButtonContainerBgC = themeMode === 'dark' ? "#161f28" : "white";
  const mainContainerBgC = themeMode === 'dark' ? "#161f28" : "#eaecf5";

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: mainContainerBgC }]}>
      <LoginPageHeader />

      <View style={[styles.ilustrationContainer, { backgroundColor: illustrationContainerBgC }]}
      >
        <Text style={[styles.headerText, { color: headerTextColor }]}
        >
          Cool down your Hot data with Archivum</Text>
        <Image
          source={require('../assets/images/illustration-archivum.png')}
          fadeDuration={0}
          style={styles.ilustration}
        />
        <View style={[styles.loginButtonContainer, { backgroundColor: loginButtonContainerBgC }]}
        >
          <Pressable style={styles.loginButton} onPress={() => { login() }}>
            <Text style={styles.loginButtonText}>Login with Azure</Text>
          </Pressable>
        </View>
      </View>
      <LoginPageFooterIcon />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  headerText: {
    fontSize: 35,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '500',
    top: -40,
    textAlign: 'center',
    fontFamily: 'Muli-Bold',
  },
  ilustrationContainer: {
    width: '80%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ilustration: {
    width: 300,
    height: 250,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  loginButtonContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -40,
  },
  loginButton: {
    width: '50%',
    height: '80%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e7cf2'
  },
  loginButtonText: {
    fontSize: 20,
    fontFamily: 'Muli-Bold',
    color: '#fff',
  },
});
