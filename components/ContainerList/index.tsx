import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import ContainerCard from '../ContainerCard'
import containers from '../../data/containers'

const theme = () => {
    return useColorScheme();
}
var scheme:any='';

const ContainerList = () => {
    scheme = theme();
    const listContainerBgC = scheme === 'dark' ? "#161f28" : "white";
    
    return (
        <View style={[styles.listContainer, {backgroundColor: listContainerBgC}]}>
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
    listContainer: {
        width: '100%',
        backgroundColor: 'white',
    },
})