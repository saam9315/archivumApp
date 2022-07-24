import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';


const SearchBar = () => {

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: any) => setSearchQuery(query);

    return (

        <Searchbar
            style={styles.SearchBar}
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
        backgroundColor: 'red',

    },
})