import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Logo extends Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.fontSize}>
                    Smart
                </Text>
                <Text style={[styles.greenText, styles.fontSize] }>S</Text>
                <Text style={styles.fontSize}>
                    paces
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
    fontSize: {
        fontSize: 35
    }
});

export default Logo;