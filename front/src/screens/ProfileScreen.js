import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { container } from '../styles/index'

class ProfileScreen extends Component {
    render() {
        return (
            <View style={container.centerScreen}>
                <Text>Hello World</Text>
            </View>
        );
    }
}

export default ProfileScreen;