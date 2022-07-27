import { StyleSheet, Text, useColorScheme, View, } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';


const SearchBar = () => {

    const colorScheme = useColorScheme();

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: any) => setSearchQuery(query);

    return (

        <Searchbar
            style={[styles.SearchBar, { color: colorScheme === 'dark' ? 'black' : 'white', backgroundColor: colorScheme === 'dark' ? '#1d2a38' : '#eaecf5', shadowColor: colorScheme === 'dark' ? '#1d2a38' : '#eaecf5' }]}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            icon="magnify"
        />
    )
}

export default SearchBar

const styles = StyleSheet.create({
    SearchBar: {
        width: '100%',
        // backgroundColor: 'red',

    },
})