import { StyleSheet, Text, useColorScheme, View, } from 'react-native'
import React from 'react'
import { Searchbar } from 'react-native-paper';
import Colors from '../../../constants/Colors';


const SearchBar = () => {

    const colorScheme = useColorScheme();

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: any) => setSearchQuery(query);

    return (
        <View style={[styles.searchBarContainer, { backgroundColor: colorScheme === 'dark' ? '#1d2a38' : '#eaecf5' }]} >
            <Searchbar
                style={[styles.SearchBar, { backgroundColor: colorScheme === 'dark' ? '#161f28' : 'white', shadowColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }]}
                placeholder="Search"
                theme={{ colors: { text: colorScheme === 'dark' ? 'white' : 'black' } }}
                selectionColor={Colors.tintColorLight}
                placeholderTextColor={colorScheme === 'dark' ? 'lightgrey' : 'grey'}
                iconColor={colorScheme === 'dark' ? 'lightgrey' : 'grey'}
                onChangeText={onChangeSearch}
                value={searchQuery}
                icon="magnify"
            />
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        alignSelf: 'center',
        paddingBottom: 5,
        paddingTop: 5,
    },
    SearchBar: {
        width: '96%',
        borderRadius: 50,
        height: 40,
    },
})