import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { ContainerProps } from '../../types'
import ContainerCardFooterIcons from './ContainerCardFooterIcons'
import Colors from '../../constants/Colors'


const ContainerCard = ({ container }: ContainerProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={colorScheme === 'dark'
            ? styles.containerCardDark
            : styles.containerCardLight}
        >
            <Text
                style={colorScheme === 'dark'
                    ? styles.containerCardNameTextDark
                    : styles.containerCardNameTextLight}
            >
                {container.displayName}
            </Text>
            <Text style={colorScheme === 'dark'
                ? styles.containerCardNameDescriptionDark
                : styles.containerCardNameDescriptionLight}
            >
                {container.description}
            </Text>
            <ContainerCardFooterIcons />

        </View>
    )
}

export default ContainerCard

const styles = StyleSheet.create({
    containerCardLight: {
        width: "100%",
        padding: 6,
        borderEndColor: '#eaecf5',
        borderTopColor: '#eaecf5',
        borderStartColor: '#eaecf5',
        borderWidth: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
    },
    containerCardDark: {
        width: "100%",
        paddingTop: 6,
        borderEndColor: '#1d2a38',
        borderTopColor: '#1d2a38',
        borderStartColor: '#1d2a38',
        borderWidth: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
    },
    containerCardNameTextLight: {
        fontSize: 18,
        fontFamily: 'Muli-Bold',
        fontWeight: "bold",
        color: '#2e7ef2',
        marginBottom: 10,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerCardNameTextDark: {
        fontSize: 18,
        fontFamily: 'Muli-Bold',
        fontWeight: "bold",
        color: '#2e7ef2',
        marginBottom: 10,
        paddingTop: 5,
        paddingLeft: 16,
        paddingRight: 16,
    },
    containerCardNameDescriptionLight: {
        fontSize: 14,
        fontFamily: 'Muli-Regular',
        color: '#748590',
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerCardNameDescriptionDark: {
        fontSize: 14,
        fontFamily: 'Muli-Regular',
        color: 'lightgrey',
        paddingLeft: 18,
        paddingRight: 18,
    },
});