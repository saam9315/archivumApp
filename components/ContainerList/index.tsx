import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import ContainerCard from '../ContainerCard'
import containers from '../../data/containers'

const ContainerList = () => {
    const colorScheme = useColorScheme();
    return (
        <View style={colorScheme === 'dark' ? styles.listContainerDark : styles.listContainerLight}>
            <FlatList
                data={containers}
                renderItem={({ item }) => <ContainerCard container={item} />}
                keyExtractor={item => item.displayName}
            />
        </View>
    )
}

export default ContainerList

const styles = StyleSheet.create({
    listContainerLight: {
        width: '100%',
        backgroundColor: 'white',
    },
    listContainerDark: {
        width: '100%',
        backgroundColor: '#161f28',
    },
})