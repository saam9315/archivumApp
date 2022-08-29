import { Pressable, StyleSheet, useColorScheme, Text, ScrollView } from 'react-native'
import React from 'react'
import { View } from '../../../components/Themed';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { ContainerParameters, KeyParameter } from '../../../types';

const KeyParameterForm = ({ containerParameters }: KeyParameter[] | any) => {
    const colorScheme = useColorScheme();
    //console.log(containerParameters.flatMap((item: { name: String; }): String => item.name));
    //console.log(containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {}));

    return (
        <View style={styles.mainContainer}>
            <Formik
                initialValues={containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {})}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    //addReview(values);
                    //console.log(values)
                }}
            >
                {props => (
                    <View style={styles.keyParamContainer}>
                        <View style={styles.separator} lightColor="black" darkColor="rgba(255,255,255,0.1)" />
                        <Text style={[styles.keyParamSectionTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
                            Key Parameters
                        </Text>
                        <ScrollView style={{ width: '100%' }}>
                            {containerParameters.map(function (item: any, index: number) {
                                let itemName = item.name
                                return (
                                    <View style={styles.keyParamRow} key={index}>
                                        <Text style={[styles.keyParamNameText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
                                            {item.name}:
                                        </Text>
                                        <TextInput
                                            style={styles.textInput}
                                            mode="outlined"
                                            outlineColor='#2e7ef2'
                                            activeOutlineColor='#2e7ef2'
                                            activeUnderlineColor='#2e7ef2'
                                            onChangeText={props.handleChange(`${item.name}`)}
                                            theme={{ colors: { text: colorScheme === 'dark' ? 'white' : 'black' } }}
                                            label={item.type}
                                            value={props.values.itemName}
                                        />
                                    </View>


                                )
                            })}
                            <View style={styles.buttonContainer}>
                                <Pressable style={styles.submitButton} onPress={() => { }}>
                                    <Text style={styles.submitButtonText}>Submit</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default KeyParameterForm

const styles = StyleSheet.create({
    keyParamContainer: {
        //backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        margin: 10,
        padding: 10
    },
    keyParamSectionTitle: {
        padding: 5,
        fontSize: 20,
        fontFamily: 'Muli-Bold',
        color: '#fff',
    },
    keyParamRow: {
        flexDirection: 'row',
        //backgroundColor: 'purple',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    keyParamNameText: {
        fontSize: 20,
        fontFamily: 'Muli-Bold',
        color: '#fff',
    },
    mainContainer: {
        //backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '40%',
        margin: 10,
    },
    textInput: {
        margin: 10,
        width: 200,
        height: 40,
        borderRadius: 10,
    },
    submitButton: {
        width: 200,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2e7cf2',
        margin: 10,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    submitButtonText: {
        fontSize: 20,
        fontFamily: 'Muli-Bold',
        color: '#fff',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '85%',
    },
})