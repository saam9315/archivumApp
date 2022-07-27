import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';


const ContainerCardFooterIcons = () => {

    const navigation = useNavigation();

    const onPress = () => {
    }
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? '#161f28' : 'white';
    const textColor = colorScheme === 'dark' ? 'lightgrey' : 'black';
    const iconColor = colorScheme === 'dark' ? 'lightgrey' : 'black';

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome.Button
                    style={{ marginRight: -12 }}
                    selectionColor={Colors.light.tint}
                    backgroundColor={backgroundColor}
                    onPress={() => { console.warn('Hello there') }}
                    name="files-o" size={18}
                    color={iconColor}
                />
                <Text style={{ color: textColor }}>12</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons.Button onPress={onPress} style={{ marginRight: -12 }} backgroundColor={backgroundColor} name="people-outline" size={20} color={iconColor} />
                <Text style={{ color: textColor }}>2</Text>
            </View>

            <View>
                <AntDesign.Button style={{ marginRight: -12 }} backgroundColor={backgroundColor} name="edit" size={20} color={iconColor} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <AntDesign.Button style={{ marginRight: -12 }} backgroundColor={backgroundColor} selectionColor={Colors.dark.tint} name="addfile" size={24} color={iconColor} />
            </View>
        </View>
    )
}

export default ContainerCardFooterIcons

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        margin: 1,
    },
})