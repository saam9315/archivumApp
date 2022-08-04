import { StyleSheet, Image, View, useColorScheme } from 'react-native'
import React from 'react'


const LoginPageFooterIcon = () => {
    const themeMode = useColorScheme();
    const iconBackground = themeMode === 'dark' ? "#161f28" : "#eaecf5";
    return (
        <View style={[styles.footerIconContainer, { backgroundColor: iconBackground }]}
        >
            <Image
                source={themeMode === 'dark'
                    ? require('../../../assets/images/mobilabLogoDark.png')
                    : require('../../../assets/images/mobilabLogoLight.png')}
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