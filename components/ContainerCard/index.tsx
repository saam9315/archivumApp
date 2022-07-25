import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { ContainerProps } from '../../types'
import ContainerCardFooterIcons from './ContainerCardFooterIcons'

const theme = () => {
    return useColorScheme();
}
var scheme:any='';

const ContainerCard = ({ container }: ContainerProps) => {
    scheme = theme();
    const containerCardBgC = scheme === 'dark' ? "#1d2a38" : "#eaecf5";
    const containerNameTextColor = scheme === 'dark'? "#15e8dd" : "#2e7ef2"
    const containerDescriptionTextColor = scheme === 'dark'? "lightgrey": "#748590"

    return (
        <View style={[
            styles.containerCard, 
            {borderEndColor: containerCardBgC, 
            borderTopColor: containerCardBgC,
            borderStartColor: containerCardBgC
            }
            ]}  
        >
            <Text
                style={[styles.containerNameText,
                    {color: containerNameTextColor
                    }
                ]}
            >
                {container.displayName}
            </Text>
            <Text style={[styles.containerCardDescriptionText, {color: containerDescriptionTextColor}]}
            >
                {container.description}
            </Text>
            <ContainerCardFooterIcons />

        </View>
    )
}

export default ContainerCard

const styles = StyleSheet.create({
    containerCard: {
        width: "100%",
        padding: 6,
        borderWidth: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
    },
    containerNameText: {
        fontSize: 18,
        fontFamily: 'Muli-Bold',
        fontWeight: "bold",
        marginBottom: 10,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerCardDescriptionText: {
        fontSize: 14,
        fontFamily: 'Muli-Regular',
        paddingLeft: 10,
        paddingRight: 10,
    },
});