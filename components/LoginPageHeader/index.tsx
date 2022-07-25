import { StyleSheet, View, Image, useColorScheme, Platform } from 'react-native'
import React from 'react'

const theme = () => {
    return useColorScheme();
}
var scheme:any='';

const LoginPageHeader = () => {
    scheme = theme();
    const iconBackground = scheme === 'dark' ? "#161f28" : "#eaecf5";

    return (
        <View style= {[styles.headerIconContainer, {backgroundColor: iconBackground }]}
        >
            <Image
                source={require('../../assets/images/fav-icon_with-bg.png')}
                fadeDuration={0}
                style={[styles.headerIcon, {backgroundColor: iconBackground }]}
            />
        </View>
    )
}

export default LoginPageHeader

const styles = StyleSheet.create({
    headerIconContainer: {
        top: -90,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        width: '60%',
        height: 30,
        resizeMode: 'contain', 
    },
})