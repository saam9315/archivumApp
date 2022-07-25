import { StyleSheet, View, Image, useColorScheme } from 'react-native'
import React from 'react'

const LoginPageHeader = () => {
    const colorScheme = useColorScheme();
    return (
        <View style={colorScheme === 'dark'
            ? styles.headerIconContainerDark
            : styles.headerIconContainerLight}
        >
            <Image
                source={require('../../assets/images/fav-icon_with-bg.png')}
                fadeDuration={0}
                style={colorScheme === 'dark'
                    ? styles.headerIconDark
                    : styles.headerIconLight}
            />
        </View>
    )
}

export default LoginPageHeader

const styles = StyleSheet.create({
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
})