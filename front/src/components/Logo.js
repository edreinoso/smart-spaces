import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Logo extends Component {
    render() {
        const {
            fontSize,
        } = this.props;
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: fontSize }}>
                    SMART
                </Text>
                <Text style={[styles.greenText, { fontSize: fontSize, paddingLeft: 10}] }>S</Text>
                <Text style={{ fontSize: fontSize }}>
                    PACES
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    greenText: {
        color: '#7EB72E',
        fontWeight: '500'
    },
});

export default Logo;