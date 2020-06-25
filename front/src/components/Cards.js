import React, { Component } from 'react'
import { View } from 'react-native'
import { cards } from '../styles/index'

class Cards extends Component {
    render() {
        const {
            style,
            children
        } = this.props
        return (
            <View style={[cards.container, style]}>
                {children}
            </View>
        )
    }
}

export default Cards;
