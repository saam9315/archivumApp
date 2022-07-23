import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { ContainerProps } from '../../types'
import ContainerCardFooterIcons from './ContainerCardFooterIcons'


const ContainerCard = ({ container }: ContainerProps) => {
    const colorScheme = useColorScheme();

    return (
        <View style={styles.containerCard}>
            <Text
                style={colorScheme === 'dark' ?
                    styles.containerCardNameTextDark :
                    styles.containerCardNameTextLight}
            >
                {container.displayName}
            </Text>
            <Text style={colorScheme === 'dark' ?
                styles.containerCardNameDescriptionDark :
                styles.containerCardNameDescriptionLight}
            >
                {container.description}
            </Text>
            <ContainerCardFooterIcons />

        </View>
    )
}

export default ContainerCard

const styles = StyleSheet.create({
    containerCard: {
        width: "100%",
        padding: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
    },
    containerCardNameTextLight: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black',
        marginBottom: 10,
        paddingTop: 5,
    },
    containerCardNameTextDark: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
        marginBottom: 10,
        paddingTop: 5,
    },
    containerCardNameDescriptionLight: {
        fontSize: 15,
        color: 'black',
        paddingLeft: 2,
    },
    containerCardNameDescriptionDark: {
        fontSize: 15,
        color: 'white',
        paddingLeft: 2,
    },
});