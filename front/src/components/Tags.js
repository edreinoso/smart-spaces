import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { text, colors, borders } from '../styles/index';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Tags extends Component {
    render() {
        const { section, onButtonPress } = this.props;
        return (
            <View style=
                {
                    [
                        ((section === 'Green') ? styles.greenBackgroundFilter : null) ||
                        ((section === 'Red') ? styles.redBackgroundFilter : null) ||
                        ((section === 'Blue') ? styles.blueBackgroundFilter : null) ||
                        ((section === 'Orange') ? styles.orangeBackgroundFilter : null),
                        { padding: 7, flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center", borderRadius: 10, width: 80 }
                    ]
                }
            >
                <Text style={{ color: colors.white}}>{section}</Text>
                <TouchableOpacity onPress={onButtonPress}>
                    <Icon
                        name={'close'}
                        color={colors.white}
                        size={10}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    greenBackgroundFilter: {
        backgroundColor: '#45CE53',
    },
    redBackgroundFilter: {
        backgroundColor: "#E02020",
    },
    blueBackgroundFilter: {
        backgroundColor: "#037FDE",
    },
    orangeBackgroundFilter: {
        backgroundColor: "#F37D2D",
    },
});

export default Tags;
