import { StyleSheet, Text, View, Image, useColorScheme, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const LoginPageIllustrationModal = () => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Root');
    }
    return (
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
                source={require('../../assets/images/illustration-archivum.png')}
                fadeDuration={0}
                style={styles.ilustration}
            />
            <View style={colorScheme === 'dark'
                ? styles.loginButtonContainerDark
                : styles.loginButtonContainerLight}
            >
                <Pressable style={styles.loginButton} onPress={() => { handleLogin() }}>
                    <Text style={styles.loginButtonText}>Login with Azure</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default LoginPageIllustrationModal

const styles = StyleSheet.create({
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
})