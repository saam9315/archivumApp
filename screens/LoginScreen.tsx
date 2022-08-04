
import React from 'react';
import { StyleSheet, SafeAreaView, useColorScheme, Image, Pressable, Text, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import LoginIllustration from '../components/LoginView/LoginIllusatration';
import LoginPageFooterIcon from '../components/LoginView/LoginPageFooterIcon';
import LoginPageHeader from '../components/LoginView/LoginPageHeader';
import { useAuth } from '../contexts/Auth';
import { isLoadingAtom } from '../stores/Atoms';

export default function LoginScreen() {

  const setIsLoading = useSetRecoilState(isLoadingAtom)
  const auth = useAuth();

  const login = async () => {
    setIsLoading(true);
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
        {/* <Image
          source={require('../assets/images/archivum-illustration.svg')}
          fadeDuration={0}
          style={styles.ilustration}
        /> */}

        <LoginIllustration></LoginIllustration>
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
    fontSize: 15,
    fontFamily: 'Muli-Bold',
    color: '#fff',
  },
});
