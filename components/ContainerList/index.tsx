import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ContainerCard from '../ContainerCard'
import containers from '../../data/containers'

const ContainerList = () => {
    return (
        <View style={{ width: '100%' }}>
            <FlatList
                data={containers}
                renderItem={({ item }) => <ContainerCard container={item} />}
                keyExtractor={item => item.displayName}
            />
        </View>
    )
}

export default ContainerList

const styles = StyleSheet.create({})