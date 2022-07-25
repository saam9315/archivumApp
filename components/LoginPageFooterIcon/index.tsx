import { StyleSheet, Image, View, useColorScheme } from 'react-native'
import React from 'react'

const theme = () => {
    return useColorScheme();
}
var scheme:any='';

const LoginPageFooterIcon = () => {
    scheme = theme();
    const iconBackground = scheme === 'dark' ? "#161f28" : "#eaecf5";
    return (
        <View style={[styles.footerIconContainer, {backgroundColor: iconBackground }]}
        >
            <Image
                source={scheme === 'dark'
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
    footerIconContainer: {
        bottom: -100,
        alignItems: 'center',
        width: '100%',
    },
    footerIcon: {
        width: 200,
        height: 120,
        resizeMode: 'contain'
    }
})