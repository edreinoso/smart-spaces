import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { colors } from '../styles/index'

class Input extends Component {
    render() {
        const {
            title,
            placeholder,
            borderColor,
            borderWidth,
            autoCorrect,
            autoCapitalize,
            color,
            value,
            touched,
            valid,
            onChangeInput,
            onFinishInput,
            errorText,
            minLength,
            secureTextEntry,
            keyboardType,
            required, //this value represent required fields
            placeholderTextColor,
            borderRadius,
        } = this.props
        return (
            <View style={styles.formControl}>
                <Text style={styles.label}>{title}</Text>
                <TextInput
                    placeholder={placeholder ? placeholder : ''}
                    value={value}
                    // new function that would be on change text after finish
                    onChangeText={onChangeInput}
                    onEndEditing={onFinishInput}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    autoCorrect={autoCorrect}
                    secureTextEntry={secureTextEntry}
                    // need to set
                    // onBlur={lostFocusHandler}
                    style={[styles.inputPadding, {
                        color: color,
                        borderBottomColor: borderColor,
                        borderBottomWidth: borderWidth
                    }]}
                />
                {!valid && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errorText}</Text>
                    </View>
                )}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        padding: 10
    },
    label: {
        marginHorizontal: 5
    },
    inputPadding: {
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    bottomPadding: {
        paddingBottom: 2
    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        color: colors.red,
        fontSize: 13
    }
})

export default Input
