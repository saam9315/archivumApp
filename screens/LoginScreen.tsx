import React from 'react';
import { Button, Pressable, StyleSheet, Image, SafeAreaView, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';



export default function LoginScreen() {

  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={colorScheme === 'dark'
      ? styles.mainContainerDark
      : styles.mainContainerLight}
    >

      <View style={colorScheme === 'dark'
        ? styles.headerIconContainerDark
        : styles.headerIconContainerLight}
      >
        <Image
          source={require('../assets/images/fav-icon_with-bg.png')}
          fadeDuration={0}
          style={colorScheme === 'dark'
            ? styles.headerIconDark
            : styles.headerIconLight}
        />
      </View>
      <View style={colorScheme === 'dark'
        ? styles.ilustrationContainerDark
        : styles.ilustrationContainerLight}
      >
        <Text style={colorScheme === 'dark'
          ? styles.headerTextDark
          : styles.headerTextLight}
        >
          Cool down your Hot data with Archivum</Text>
        <Image
          source={require('../assets/images/illustration-archivum-png.png')}
          fadeDuration={0}
          style={styles.ilustration}
        />
        <View style={colorScheme === 'dark'
          ? styles.loginButtonContainerDark
          : styles.loginButtonContainerLight}
        >
          <Pressable style={styles.loginButton} onPress={() => { console.warn('pressed') }}>
            <Text style={styles.loginButtonText}>Login with Azure</Text>
          </Pressable>

        </View>
      </View>
      <View style={colorScheme === 'dark'
        ? styles.FooterIconContainerDark
        : styles.FooterIconContainerLight}
      >
        <Image
          source={colorScheme === 'dark'
            ? require('../assets/images/mobilabLogoDark.png')
            : require('../assets/images/mobilabLogoLight.png')}
          fadeDuration={0}
          style={styles.footerIcon}
        />
      </View>
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
  headerIconContainerLight: {
    top: -90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaecf5',
  },
  headerIconContainerDark: {
    top: -90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161f28',
  },
  headerIconLight: {
    width: '60%',
    height: 30,
    resizeMode: 'contain',
    backgroundColor: '#eaecf5'
  },
  headerIconDark: {
    width: '60%',
    height: 30,
    resizeMode: 'contain',
    backgroundColor: '#161f28'
  },
  headerTextLight: {
    fontSize: 35,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '500',
    top: -40,
    textAlign: 'center',
    fontFamily: 'Muli-Bold',
    color: 'black'

  },
  headerTextDark: {
    fontSize: 35,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '500',
    top: -40,
    textAlign: 'center',
    fontFamily: 'Muli-Bold',
    color: 'white'
  },
  ilustrationContainerLight: {
    width: '80%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ilustrationContainerDark: {
    width: '80%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161f28',
  },
  ilustration: {
    width: 300,
    height: 250,
    borderRadius: 50,
    resizeMode: 'contain',

  },
  loginButtonContainerLight: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -40,
    backgroundColor: 'white',
  },
  loginButtonContainerDark: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -40,
    backgroundColor: '#161f28',
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
  FooterIconContainerLight: {
    bottom: -100,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#eaecf5'
  },
  FooterIconContainerDark: {
    bottom: -100,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#161f28'
  },
  footerIcon: {
    width: 200,
    height: 120,
    resizeMode: 'contain'
  }
});
