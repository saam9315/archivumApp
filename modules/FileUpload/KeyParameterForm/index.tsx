import {
  StyleSheet,
  useColorScheme,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  KeyboardAvoidingView,
} from "react-native";
import REACT_APP_ENTITIES_BASE_URL from "@env";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { Container, ContainerProps, KeyParameter } from "../../../types";
import { useRecoilValue } from "recoil";
import {
  selectedFileAtom,
  suggestedValuesAtom,
  tempEntityKeyAtom,
  userTokenAtom,
} from "../../../stores/Atoms";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import Separator from "../../../components/Separator";
import { useAuth } from "../../../contexts/Auth";
import { TokenResponse } from "expo-auth-session";
import * as Yup from "yup";

const KeyParameterForm = (container: ContainerProps) => {
  const colorScheme = useColorScheme();
  const currContainer: Container = container.container;
  const containerParameters: Array<KeyParameter> | any =
    currContainer.requiredParameters;
  const file = useRecoilValue(selectedFileAtom);
  const userToken = useRecoilValue(userTokenAtom);
  if (userToken) var userAccessToken = new TokenResponse(userToken);
  const tempEntityKey = useRecoilValue(tempEntityKeyAtom);
  const suggestedValues = useRecoilValue(suggestedValuesAtom);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const ofTypeString = ["enum", "keyword", "text", "date"];

  // console.log(suggestedValues);

  let testObj = {
    Year: ["2022", "2021"],
  };
  //console.log(testObj["Year"][0]);

  //let temp: string = "Department";
  // Object.entries(suggestedValues).map(([key, value]) => {
  //   // console.log(value);
  // });

  let fileName = file.uri.substring(file.uri.lastIndexOf("/") + 1);
  const navigation = useNavigation();
  let auth = useAuth();

  let initialFormValues = Object.fromEntries(
    containerParameters.map((item: KeyParameter) => [item.name, ""])
  );
  initialFormValues = { ...initialFormValues, file: fileName };

  let validationObject = Object.fromEntries(
    containerParameters.map((item: KeyParameter) => [
      item.name,
      ofTypeString.includes(item.type)
        ? Yup.string().required()
        : Yup.number().required(),
    ])
  );

  const formValidationSchema = Yup.object().shape(validationObject);

  return (
    <ScrollView style={[styles.mainContainer]}>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={initialFormValues}
            validationSchema={formValidationSchema}
            onSubmit={async (values, actions) => {
              setIsButtonLoading(true);

              let asArray = Object.entries(values);

              let filteredParams = asArray.filter(([key, value]) => {
                return key !== "file" && value !== fileName;
              });

              let asObj = Object.fromEntries(filteredParams);

              var queryString = Object.keys(asObj)
                .map((key) => key + "=" + asObj[key])
                .join("&");

              if (!userAccessToken.shouldRefresh()) {
                let TOKEN = `Bearer ${userAccessToken.accessToken}`;

                const BASE_URL = process.env.REACT_APP_ENTITIES_BASE_URL;

                const entityUploadUrl = `${BASE_URL}/by-temp-entity-key/${currContainer.name}?${queryString}`;

                try {
                  axios({
                    method: "put",
                    data: tempEntityKey,
                    url: entityUploadUrl,
                    headers: {
                      "Content-Type": "application/json",
                      "X-filename": fileName,
                      authorization: TOKEN,
                    },
                  })
                    .then((response: AxiosResponse) => {
                      setIsButtonLoading(false);
                      console.log(response.data);
                      Toast.show("File uploaded successfuly!", {
                        textStyle: {
                          fontSize: 18,
                        },
                        duration: Toast.durations.LONG,
                        backgroundColor: "green",
                      });
                      actions.resetForm();
                      navigation.navigate("Home");
                    })
                    .catch((error: AxiosError) => {
                      setIsButtonLoading(false);
                      let errorData: any = error.response?.data;
                      Toast.show("" + errorData.message, {
                        textStyle: {
                          fontSize: 18,
                        },
                        duration: Toast.durations.LONG,
                        backgroundColor: "red",
                      });
                    });
                } catch (error) {
                  console.log(error);
                }
              } else {
                setIsButtonLoading(false);
                Toast.show("Unauthorised!", {
                  textStyle: {
                    fontSize: 18,
                  },
                  duration: Toast.durations.LONG,
                  backgroundColor: "red",
                });
                auth.signOut();
              }
            }}
          >
            {({
              errors,
              touched,
              handleChange,
              values,
              setFieldValue,
              handleSubmit,
            }) => (
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
                    onChangeText={handleChange("file")}
                    theme={{
                      colors: {
                        text: colorScheme === "dark" ? "black" : "black",
                      },
                    }}
                    value={values.file}
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

                {containerParameters?.map(function (
                  item: KeyParameter | any,
                  index: number
                ) {
                  let itemName: string = item.name;
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

                      {item.type == "enum" ? (
                        <SelectDropdown
                          data={item.values}
                          defaultButtonText={`Select ${itemName}`}
                          onSelect={(selectedItem) => {
                            setFieldValue(itemName, selectedItem);
                          }}
                          buttonTextAfterSelection={(selectedItem) => {
                            // text represented after item is selected
                            return selectedItem;
                          }}
                          rowTextForSelection={(item) => {
                            // text represented for each item in dropdown
                            return item;
                          }}
                          buttonStyle={{
                            width: 200,
                            height: 34,
                            marginLeft: 30,
                            backgroundColor: "#F6F6F6",
                            borderRadius: 5,
                            borderWidth: 1,
                            margin: 10,
                            borderColor:
                              errors[itemName] && touched[itemName]
                                ? "red"
                                : "#2e7cf2",
                          }}
                          buttonTextStyle={styles.dropdown1BtnTxtStyle}
                          renderDropdownIcon={(isOpened) => {
                            return (
                              <FontAwesome
                                name={isOpened ? "chevron-up" : "chevron-down"}
                                color={"#444"}
                                size={12}
                              />
                            );
                          }}
                          dropdownIconPosition={"right"}
                          dropdownStyle={styles.dropdown1DropdownStyle}
                          rowStyle={styles.dropdown1RowStyle}
                          rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
                      ) : (
                        <TextInput
                          style={styles.textInput}
                          //label={item.type}
                          error={
                            errors[itemName] && touched[itemName] ? true : false
                          }
                          mode="outlined"
                          keyboardType={
                            ofTypeString.includes(item.type) &&
                            item.type !== "date"
                              ? "default"
                              : "numbers-and-punctuation"
                          }
                          outlineColor="#2e7ef2"
                          activeOutlineColor="#2e7ef2"
                          activeUnderlineColor="#2e7ef2"
                          onChangeText={handleChange(itemName)}
                          theme={{
                            colors: {
                              text: colorScheme === "dark" ? "black" : "black",
                            },
                          }}
                          placeholder={item.type}
                          value={
                            suggestedValues
                              ? suggestedValues[itemName][0]
                              : values.itemName
                          }
                        />
                      )}
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
                  <Button
                    style={[
                      styles.submitButton,
                      {
                        backgroundColor: isButtonLoading ? "grey" : "#2e7cf2",
                      },
                    ]}
                    disabled={isButtonLoading}
                    labelStyle={{
                      fontFamily: "Muli-Bold",
                      color: isButtonLoading ? "lightgrey" : "white",
                    }}
                    onPress={
                      /*handleSubmit*/ () => {
                        console.log(values);
                      }
                    }
                    loading={isButtonLoading}
                  >
                    Upload File
                  </Button>
                </View>
                <View
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor:
                        colorScheme === "dark" ? "#161f28" : "#eaecf5",
                    },
                  ]}
                ></View>
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
    height: 900,
    padding: 20,
  },
  keyParamContainer: {
    flex: 1,
    bottom: -40,
  },
  keyParamSectionTitle: {
    padding: 5,
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  },
  keyParamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  keyParamNameText: {
    fontSize: 18,
    color: "#fff",
    paddingLeft: 30,
  },
  dropdownContainer: {
    flex: 1,
    height: 80,
    justifyContent: "center",
    backgroundColor: "#eaecf5",
  },
  textInput: {
    margin: 5,
    marginRight: 30,
    width: 200,
    height: 30,
    borderRadius: 10,
    textAlign: "center",
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
  dropdown1BtnStyle: {},
  dropdown1BtnTxtStyle: { color: "black", textAlign: "center", fontSize: 14 },
  dropdown1DropdownStyle: { borderRadius: 10 },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
    height: 40,
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "center", fontSize: 14 },
});
