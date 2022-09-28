import {
    StyleSheet,
    useColorScheme,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    KeyboardAvoidingView
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { KeyParameter } from "../../../types";
import { useRecoilState } from "recoil";
import { selectedFileAtom } from "../../../stores/Atoms";
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from "@expo/vector-icons";
import Separator from "../../Separator";

const KeyParameterForm = ({ containerParameters }: KeyParameter[] | any) => {
    const colorScheme = useColorScheme();
    const [fileName, setFileName] = useRecoilState(selectedFileAtom);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    //console.log(containerParameters)
    //console.log(containerParameters.flatMap((item: { name: String; }): String => item.name));
    //console.log(containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {}));

    return (
        <ScrollView style={[styles.mainContainer]}>
            <KeyboardAvoidingView behavior='position'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={containerParameters.reduce(
                            (acc: any, cur: { name: any; value: any }) => ({
                                ...acc,
                                [cur.name]: "",
                            }),
                            {}
                        )}
                        onSubmit={(values, actions) => {
                            actions.resetForm();
                            console.log(values)
                        }}
                    >
                        {(props) => (
                            <View
                                style={[
                                    styles.keyParamContainer,
                                    {
                                        backgroundColor:
                                            colorScheme === "dark" ? "#161f28" : "#eaecf5",
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.keyParamRow,
                                        {
                                            backgroundColor:
                                                colorScheme === "dark" ? "#161f28" : "#eaecf5",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.keyParamNameText,
                                            { color: colorScheme === "dark" ? "white" : "black" },
                                        ]}
                                    >
                                        File Name:
                                    </Text>
                                    <TextInput
                                        style={styles.textInput}
                                        mode="outlined"
                                        outlineColor="#2e7ef2"
                                        activeOutlineColor="#2e7ef2"
                                        activeUnderlineColor="#2e7ef2"
                                        defaultValue={fileName}
                                        onChangeText={setFileName}

                                        theme={{
                                            colors: {
                                                text: colorScheme === "dark" ? "black" : "black",
                                            },
                                        }}
                                        value={fileName}
                                    />
                                </View>

                                <Separator />

                                <Text
                                    style={[
                                        styles.keyParamSectionTitle,
                                        { color: colorScheme === "dark" ? "white" : "black" },
                                    ]}
                                >
                                    Key Parameters
                                </Text>

                                {containerParameters.map(function (item: any, index: number) {
                                    let itemName = item.name;
                                    return (
                                        <View
                                            style={[
                                                styles.keyParamRow,
                                                {
                                                    backgroundColor:
                                                        colorScheme === "dark" ? "#161f28" : "#eaecf5",
                                                },
                                            ]}
                                            key={index}
                                        >
                                            <Text
                                                style={[
                                                    styles.keyParamNameText,
                                                    { color: colorScheme === "dark" ? "white" : "black" },
                                                ]}
                                            >
                                                {itemName}:
                                            </Text>

                                            {item.type == 'enum' ?
                                                <SelectDropdown
                                                    data={item.values}
                                                    defaultButtonText={`Select ${itemName}`}

                                                    onSelect={(selectedItem) => {
                                                        props.setFieldValue(`${itemName}`, selectedItem)
                                                    }}
                                                    buttonTextAfterSelection={(selectedItem) => {
                                                        // text represented after item is selected
                                                        return selectedItem
                                                    }}
                                                    rowTextForSelection={(item) => {
                                                        // text represented for each item in dropdown
                                                        return item
                                                    }}
                                                    buttonStyle={styles.dropdown1BtnStyle}
                                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                                    renderDropdownIcon={isOpened => {
                                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
                                                    }}
                                                    dropdownIconPosition={'right'}
                                                    dropdownStyle={styles.dropdown1DropdownStyle}
                                                    rowStyle={styles.dropdown1RowStyle}
                                                    rowTextStyle={styles.dropdown1RowTxtStyle}
                                                />
                                                :
                                                <TextInput
                                                    style={styles.textInput}
                                                    mode="outlined"
                                                    outlineColor="#2e7ef2"
                                                    activeOutlineColor="#2e7ef2"
                                                    activeUnderlineColor="#2e7ef2"
                                                    onChangeText={props.handleChange(`${item.name}`)}
                                                    theme={{
                                                        colors: {
                                                            text: colorScheme === "dark" ? "black" : "black",
                                                        },
                                                    }}
                                                    placeholder={item.type}
                                                    value={props.values.itemName}
                                                />
                                            }

                                        </View>
                                    );
                                })}
                                <View
                                    style={[
                                        styles.buttonContainer,
                                        {
                                            backgroundColor:
                                                colorScheme === "dark" ? "#161f28" : "#eaecf5",
                                        },
                                    ]}
                                >
                                    <Button style={[styles.submitButton, { backgroundColor: isButtonDisabled ? 'grey' : '#2e7cf2' }]} color='white' onPress={props.handleSubmit} disabled={isButtonDisabled}> Submit</Button>
                                </View>

                            </View>
                        )}
                    </Formik>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>

    );
};

export default KeyParameterForm;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20
    },
    keyParamContainer: {
        flex: 1,
        bottom: -40
    },
    keyParamSectionTitle: {
        padding: 5,
        fontSize: 18,
        color: "#fff",
        alignSelf: 'center'
    },
    keyParamRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    keyParamNameText: {
        fontSize: 18,
        color: "#fff",
        paddingLeft: 30
    },
    dropdownContainer: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#eaecf5'
    },
    textInput: {
        margin: 5,
        marginRight: 30,
        width: 200,
        height: 30,
        borderRadius: 10,
        textAlign: 'center'
    },
    submitButton: {
        width: 200,
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 40,
    },
    submitButtonText: {
        fontSize: 18,
        color: "#fff",
    },
    dropdown1BtnStyle: {
        width: 200,
        height: 34,
        marginLeft: 30,
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderColor: '#2e7cf2',
        borderWidth: 1,
        margin: 10,
    },
    dropdown1BtnTxtStyle: { color: 'black', textAlign: 'center', fontSize: 14 },
    dropdown1DropdownStyle: { borderRadius: 10 },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'center', fontSize: 14 },
});
