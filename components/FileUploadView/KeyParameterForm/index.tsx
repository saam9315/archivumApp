import { Pressable, StyleSheet, useColorScheme, Text, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { View } from '../../../components/Themed';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { ContainerParameters, KeyParameter } from '../../../types';
import { useRecoilValue } from 'recoil';
import { selectedFileAtom } from '../../../stores/Atoms';

const KeyParameterForm = ({ containerParameters }: KeyParameter[] | any) => {
    const colorScheme = useColorScheme();
    const fileName: string = useRecoilValue(selectedFileAtom)
    //console.log(containerParameters.flatMap((item: { name: String; }): String => item.name));
    //console.log(containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {}));

    return (
        <KeyboardAvoidingView behavior="position" style={[styles.mainContainer]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Formik
                    initialValues={containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {})}
                    onSubmit={(values, actions) => {
                        actions.resetForm();
                        //addReview(values);
                        //console.log(values)
                    }}
                >
                    {props => (
                        <View style={[styles.keyParamContainer, { backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }]}>
                            <View style={styles.separator} lightColor="black" darkColor='grey' />
                            <Text style={[styles.keyParamSectionTitle, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
                                Key Parameters
                            </Text>
                            <ScrollView style={{ maxHeight: '100%', backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }}>

                                <View style={[styles.keyParamRow, { backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }]}>
                                    <Text style={[styles.keyParamNameText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
                                        File Name:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        mode="outlined"
                                        outlineColor='#2e7ef2'
                                        activeOutlineColor='#2e7ef2'
                                        activeUnderlineColor='#2e7ef2'
                                        defaultValue={fileName}
                                        theme={{ colors: { text: colorScheme === 'dark' ? 'white' : 'black' } }}
                                        value={""}
                                    />
                                </View>

                                {containerParameters.map(function (item: any, index: number) {
                                    let itemName = item.name
                                    return (
                                        <View style={[styles.keyParamRow, { backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }]} key={index} >
                                            <Text style={[styles.keyParamNameText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>
                                                {itemName}:
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
                                <View style={[styles.buttonContainer, { backgroundColor: colorScheme === 'dark' ? '#161f28' : '#eaecf5' }]}>
                                    <Pressable style={styles.submitButton} onPress={() => { }}>
                                        <Text style={styles.submitButtonText}>Submit</Text>
                                    </Pressable>
                                </View>
                            </ScrollView>
                        </View>
                    )}
                </Formik>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default KeyParameterForm

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        maxHeight: '45%',
    },
    keyParamContainer: {
        alignItems: 'center',
        width: '100%',
        height: '95%',
        padding: 10,
    },
    keyParamSectionTitle: {
        padding: 10,
        fontSize: 18,
        color: '#fff',
    },
    scrollViewContainer: {
        width: '100%',
        height: '10%',
        maxHeight: '40%',
    },
    keyParamRow: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'purple',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    keyParamNameText: {
        fontSize: 16,
        color: '#fff',
    },

    textInput: {
        margin: 10,
        width: 200,
        height: 35,
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
        alignItems: 'center',

    },
    submitButtonText: {
        fontSize: 18,
        color: '#fff',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '80%',
    },
})