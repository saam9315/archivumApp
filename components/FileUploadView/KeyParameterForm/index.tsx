import {
    StyleSheet,
    useColorScheme,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React from "react";
import { View } from "../../../components/Themed";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { KeyParameter } from "../../../types";
import { useRecoilState } from "recoil";
import { selectedFileAtom } from "../../../stores/Atoms";
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from "@expo/vector-icons";

const KeyParameterForm = ({ containerParameters }: KeyParameter[] | any) => {
    const colorScheme = useColorScheme();
    const [fileName, setFileName] = useRecoilState(selectedFileAtom);

    //console.log(containerParameters)
    //console.log(containerParameters.flatMap((item: { name: String; }): String => item.name));
    //console.log(containerParameters.reduce((acc: any, cur: { name: any; value: any; }) => ({ ...acc, [cur.name]: '' }), {}));

    return (
        <View style={[styles.mainContainer]}>
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
                            <Text
                                style={[
                                    styles.keyParamSectionTitle,
                                    { color: colorScheme === "dark" ? "white" : "black" },
                                ]}
                            >
                                Key Parameters
                            </Text>
                            <View
                                style={styles.separator}
                                lightColor="black"
                                darkColor="grey"
                            />
                            <ScrollView
                                style={{
                                    flex: 1,
                                    backgroundColor:
                                        colorScheme === "dark" ? "#161f28" : "#eaecf5",
                                }}
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
                                                text: colorScheme === "dark" ? "white" : "black",
                                            },
                                        }}
                                        value={""}
                                    />
                                </View>

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
                                    <Button style={styles.submitButton} color='white' onPress={props.handleSubmit}> Submit</Button>
                                </View>
                            </ScrollView>
                        </View>
                    )}
                </Formik>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default KeyParameterForm;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    keyParamContainer: {
        flex: 1,
        alignItems: "center",
    },
    keyParamSectionTitle: {
        padding: 10,
        fontSize: 18,
        color: "#fff",
    },
    scrollViewContainer: {
        flex: 1
    },
    keyParamRow: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'purple',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    keyParamNameText: {
        fontSize: 18,
        color: "#fff",

    },
    dropdownContainer: {
        flex: 1,
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#eaecf5'
    },
    enumDropdown: {
        width: '100%',
        height: '5%',
        bottom: 100
    },
    textInput: {
        margin: 15,
        width: 200,
        height: 30,
        borderRadius: 10,
    },
    submitButton: {
        width: 200,
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2e7cf2",
        margin: 10,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    submitButtonText: {
        fontSize: 18,
        color: "#fff",
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: "80%",
    },
    dropdown1BtnStyle: {
        width: 200,
        height: 34,
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderColor: '#2e7cf2',
        borderWidth: 1,
        margin: 10
    },
    dropdown1BtnTxtStyle: { color: '#747474', textAlign: 'center', fontSize: 14 },
    dropdown1DropdownStyle: { borderRadius: 10 },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5', height: 40 },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'center', fontSize: 14 },
});
