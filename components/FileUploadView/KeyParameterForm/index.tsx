import { StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import { ContainerParameters, KeyParameter } from '../../../types';

const KeyParameterForm = ({ containerParameters }: KeyParameter[] | any) => {
    const colorScheme = useColorScheme();
    //console.log(containerParameters.flatMap((item: { name: String; }): String => item.name));
    console.log(containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {}));

    return (
        <View style={styles.container}>
            {/* <TextInput
                style={styles.textInput}
                mode="outlined"
                outlineColor='#2e7ef2'
                activeOutlineColor='#2e7ef2'
                activeUnderlineColor='#2e7ef2'
                theme={{ colors: { text: colorScheme === 'dark' ? 'white' : 'black' } }}
                label="text"
                value={text}
                onChangeText={text => setText(text)}
            /> */}
            <Formik
                initialValues={containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {})}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    //addReview(values);
                    console.log(values)
                }}
            >
                {props => (
                    <View>
                        {containerParameters.map(function (item: any) {
                            let itemName = item.name;
                            return (
                                <TextInput
                                    style={styles.textInput}
                                    mode="outlined"
                                    outlineColor='#2e7ef2'
                                    activeOutlineColor='#2e7ef2'
                                    activeUnderlineColor='#2e7ef2'
                                    theme={{ colors: { text: colorScheme === 'dark' ? 'white' : 'black' } }}
                                    label={item.name}
                                />


                            )
                        })}
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default KeyParameterForm

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50%',
        margin: 20,
    },
    textInput: {
        marginTop: 20,
        width: 200,
        height: 40,
        borderRadius: 10,
    }
})