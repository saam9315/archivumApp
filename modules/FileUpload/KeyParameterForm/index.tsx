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
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { Container, ContainerProps, KeyParameter } from "../../../types";
import { useRecoilValue } from "recoil";
import { selectedFileAtom, userTokenAtom } from "../../../stores/Atoms";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import Separator from "../../../components/Separator";

const KeyParameterForm = (container: ContainerProps) => {
  const colorScheme = useColorScheme();
  const currContainer: Container = container.container;
  const containerParameters: Array<KeyParameter> | any =
    currContainer.requiredParameters;
  const file = useRecoilValue(selectedFileAtom);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  let fileName = file.uri.substring(file.uri.lastIndexOf("/") + 1);
  const authData = useRecoilValue(userTokenAtom);
  const accessToken = authData?.accessToken;
  const navigation = useNavigation();

  let initialFormValues = containerParameters.reduce(
    (acc: any, cur: { name: any; value: any }) => ({
      ...acc,
      [cur.name]: "",
    }),
    { file: fileName }
  );

  const uploadFile = async (values: any) => {};

  //const validationSchema = yup.array().of(yup.object().shape({}));

  return (
    <ScrollView style={[styles.mainContainer]}>
      <KeyboardAvoidingView behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Formik
            initialValues={initialFormValues}
            //validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              var bodyFormData = new FormData();

              bodyFormData.append("image", file.uri);

              //console.log(bodyFormData)

              let asArray = Object.entries(values);

              let filteredParams = asArray.filter(([key, value]) => {
                return key !== "file" && value !== fileName;
              });

              let asObj = Object.fromEntries(filteredParams);

              var queryString = Object.keys(asObj)
                .map((key) => key + "=" + asObj[key])
                .join("&");

              //console.log(queryString)
              if (accessToken) {
                const headerConfig = {
                  headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "accept": "application/json",
                    "X-Filename": `${values.file}`,
                    "Content-Type": `multipart/form-data`,
                  },
                };
                //console.log(headerConfig)
                const entityPostUrl = `https://dev.archivum.mblb.net/api/entities/${currContainer.name}?${queryString}`;
                //console.log(entityPostUrl)

                axios
                  .post(entityPostUrl, { body: bodyFormData }, headerConfig)
                  .then((response: AxiosResponse) => {
                    console.log(response.data);
                    Toast.show("File uploaded successfuly!", {
                      duration: Toast.durations.LONG,
                    });
                    navigation.navigate("Root");
                  })
                  .catch((error: AxiosError) => {
                    if (error.response!.status === 400) {
                      Toast.show("" + error.response?.data?.message, {
                        duration: Toast.durations.LONG,
                      });
                    } else {
                      // Handle else
                      Toast.show("" + error.response?.data?.message, {
                        duration: Toast.durations.LONG,
                      });
                    }
                    //console.log(error.message)
                  });
              } else {
                Toast.show("Unauthorised!", {
                  duration: Toast.durations.LONG,
                });
              }
              // navigation.navigate("Root");
              actions.resetForm();
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
                    //defaultValue={fileName}
                    onChangeText={props.handleChange("file")}
                    theme={{
                      colors: {
                        text: colorScheme === "dark" ? "black" : "black",
                      },
                    }}
                    value={props.values.file}
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

                {containerParameters?.map(function (item: any, index: number) {
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

                      {item.type == "enum" ? (
                        <SelectDropdown
                          data={item.values}
                          defaultButtonText={`Select ${itemName}`}
                          onSelect={(selectedItem) => {
                            props.setFieldValue(`${itemName}`, selectedItem);
                          }}
                          buttonTextAfterSelection={(selectedItem) => {
                            // text represented after item is selected
                            return selectedItem;
                          }}
                          rowTextForSelection={(item) => {
                            // text represented for each item in dropdown
                            return item;
                          }}
                          buttonStyle={styles.dropdown1BtnStyle}
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
                          {...(props.errors.itemName &&
                            props.touched.itemName && (
                              <Text>{props.errors.title}</Text>
                            ))}
                        />
                      ) : (
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
                          {...(props.errors.itemName &&
                            props.touched.itemName && (
                              <Text>{props.errors.title}</Text>
                            ))}
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
                        backgroundColor: isButtonDisabled ? "grey" : "#2e7cf2",
                      },
                    ]}
                    color="white"
                    onPress={props.handleSubmit}
                    disabled={isButtonDisabled}
                  >
                    {" "}
                    Submit
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
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  dropdown1BtnStyle: {
    width: 200,
    height: 34,
    marginLeft: 30,
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
    borderColor: "#2e7cf2",
    borderWidth: 1,
    margin: 10,
  },
  dropdown1BtnTxtStyle: { color: "black", textAlign: "center", fontSize: 14 },
  dropdown1DropdownStyle: { borderRadius: 10 },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
    height: 40,
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "center", fontSize: 14 },
});
