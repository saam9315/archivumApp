import { StyleSheet, Text, View, Image, useColorScheme, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const theme = () => {
    return useColorScheme();
}
var scheme:any='';

const LoginPageIllustrationModal = () => {
    scheme = theme();
    const headerTextColor = scheme === 'dark' ? "white" : "black";
    const illustrationContainerBgC = scheme === 'dark' ? "#161f28" : "white";
    const loginButtonContainerBgC = scheme === 'dark' ? "#161f28" : "white";

    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.navigate('Root');
    }
    return (
        <View style={[styles.ilustrationContainer, {backgroundColor: illustrationContainerBgC}]}
        >
            <Text style={[styles.headerText, {color: headerTextColor }]}
            >
                Cool down your Hot data with Archivum</Text>
            <Image
                source={require('../../assets/images/illustration-archivum.png')}
                fadeDuration={0}
                style={styles.ilustration}
            />
            <View style={[styles.loginButtonContainer, {backgroundColor: loginButtonContainerBgC}]}
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
})