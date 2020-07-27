import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, borders } from '../styles/index';

class ButtonFilters extends Component {
    render() {
        const {
            text,
            onButtonPress,
            value, // this would be the boolean value that is used in the home screen
        } = this.props;
        // console.log(text, value)
        return (
            <TouchableOpacity onPress={onButtonPress} style={[
                ((value && text === 'Green') ? styles.greenBackgroundFilter : null) ||
                ((value && text === 'Red') ? styles.redBackgroundFilter : null) ||
                ((value && text === 'Blue') ? styles.blueBackgroundFilter : null) ||
                ((value && text === 'Orange') ? styles.orangeBackgroundFilter : null),
                { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, }
            ]}>
            {/* <TouchableOpacity onPress={onButtonPress} style={[
                value ? styles.greenBackgroundFilter : null,
                { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, }
            ]}> */}
                <View>
                    <Text style={
                        ((value && text === 'Green') ? styles.greenTextFilter : null) ||
                        ((value && text === 'Red') ? styles.redTextFilter : null) ||
                        ((value && text === 'Blue') ? styles.blueTextFilter : null) ||
                        ((value && text === 'Orange') ? styles.orangeTextFilter : null)
                    }>
                    {/* <Text style={
                        value ? styles.greenTextFilter : null
                    }> */}
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonHeaderShadow: {
        shadowColor: colors.grey,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: .1,
        elevation: 5,
    },
    buttonHeaderTextStyle: {
        backgroundColor: 'transparent',
        fontSize: text.buttonText,
        color: colors.white,
        fontWeight: '600'
    },
    highlight: {
        backgroundColor: colors.red,
    },
    highlightText: {
        color: colors.white,
        fontWeight: "600"
    },
    // Filtering
    greenBackgroundFilter: {
        backgroundColor: colors.filterBackgroundGreen,
    },
    greenTextFilter: {
        color: colors.filterTextGreen,
        fontWeight: "600"
    },
    redBackgroundFilter: {
        backgroundColor: colors.filterBackgroundRed,
    },
    redTextFilter: {
        color: colors.filterTextRed,
        fontWeight: "600"
    },
    blueBackgroundFilter: {
        backgroundColor: colors.filterBackgroundBlue,
    },
    blueTextFilter: {
        color: colors.filterTextBlue,
        fontWeight: "600"
    },
    orangeBackgroundFilter: {
        backgroundColor: colors.filterBackgroundOrange,
    },
    orangeTextFilter: {
        color: colors.filterTextOrange,
        fontWeight: "600"
    }
});

export default ButtonFilters;
