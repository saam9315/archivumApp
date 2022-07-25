import { StyleSheet, Image, View, useColorScheme } from 'react-native'
import React from 'react'

const LoginPageFooterIcon = () => {
    const colorScheme = useColorScheme();
    return (
        <View style={colorScheme === 'dark'
            ? styles.FooterIconContainerDark
            : styles.FooterIconContainerLight}
        >
            <Image
                source={colorScheme === 'dark'
                    ? require('../../assets/images/mobilabLogoDark.png')
                    : require('../../assets/images/mobilabLogoLight.png')}
                fadeDuration={0}
                style={styles.footerIcon}
            />
        </View>
    )
}

export default LoginPageFooterIcon

const styles = StyleSheet.create({
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
})