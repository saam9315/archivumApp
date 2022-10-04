import { StyleSheet, Text, useColorScheme } from "react-native";
import { View } from "../components/Themed";
import React from "react";

const Separator = () => {
    const colorScheme = useColorScheme();
    return (
        <View
            style={[
                styles.separatorContainer,
                { backgroundColor: colorScheme === "dark" ? "#161f28" : "#eaecf5" },
            ]}
        >
            <View style={styles.separator} lightColor="black" darkColor="grey" />
        </View>
    );
};

export default Separator;

const styles = StyleSheet.create({
    separator: {
        marginVertical: 5,
        height: 1,
        width: "80%",
        alignSelf: "center",
    },
    separatorContainer: {
        height: 1,
        width: "100%",
        padding: 10,
    },
});
