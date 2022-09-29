import { ActivityIndicator, FlatList, StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import ContainerCard from '../ContainerCard'
import { useRecoilValue } from 'recoil';
import { containerListSelector } from '../../../stores/Atoms';
import SearchBar from '../SearchBar';

const ContainerList = () => {
    const themeMode = useColorScheme();
    const listContainerBgC = themeMode === 'dark' ? "#161f28" : "white";
    const containers = useRecoilValue(containerListSelector)

    if (containers) {
        return (
            <View style={[styles.listContainer, { backgroundColor: listContainerBgC }]}>
                <SearchBar />
                <FlatList
                    data={containers}
                    renderItem={({ item }) => <ContainerCard container={item} />}
                    keyExtractor={(item) => item.displayName}
                />
            </View>
        )
    }
    return <ActivityIndicator color={'#000'} animating={true} size='small' />
}

export default ContainerList

const styles = StyleSheet.create({
    listContainer: {
       flex:1
    },
})