import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { ContainerProps } from '../../../types';


const ContainerCardFooterIcons = (container: ContainerProps) => {
    const navigation = useNavigation();
    const onPress = () => {
        //console.log('key params are: ', container)
        navigation.navigate('FileUploadScreen', container.container)
    }
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? '#161f28' : 'white';
    const textColor = colorScheme === 'dark' ? 'lightgrey' : 'black';
    const iconColor = colorScheme === 'dark' ? 'lightgrey' : 'black';

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                    name="file1"
                    style={{ marginRight: 2 }}
                    selectionColor={Colors.light.tint}
                    backgroundColor={backgroundColor}
                    onPress={() => { }}
                    size={14}
                    color={iconColor}
                />
                <Text style={{ color: textColor }}>12</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons.Button style={{ marginRight: -13 }} backgroundColor={backgroundColor} name="people-outline" size={16} color={iconColor} />
                <Text style={{ color: textColor }}>2</Text>
            </View>

            <View>
                <AntDesign.Button style={{ marginRight: -12 }} backgroundColor={backgroundColor} name="edit" size={16} color={iconColor} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                <AntDesign.Button onPress={onPress} style={{ marginRight: -12 }} backgroundColor={backgroundColor} selectionColor={Colors.dark.tint} name="addfile" size={16} color={iconColor} />
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