import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, dimensions } from '../styles/index';
import { LinearGradient } from 'expo-linear-gradient';

class ButtonFilters extends Component {
    render() {
        const {
            text,
            onButtonPress,
            value, // this would be the boolean value that is used in the home screen
        } = this.props;

        return (
            <TouchableOpacity onPress={onButtonPress} style={[{ paddingVertical: 10, paddingHorizontal: 20 }]}>
                <Text>{text}</Text>
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
});

export default ButtonFilters;
