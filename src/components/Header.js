import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { header } from '../styles/index';

class Header extends Component {
  // Placement would come to be the location in which objects are going to be situated in the header
  alignStyle(placement) {
    switch (placement) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  }

  generateChild(value, type, placement) {
    if (React.isValidElement(value)) {
      return <View key={type}>{value}</View>;
    } else if (typeof value === "object") {
      return type === "center" ? (
        <View
          key={type}
          style={{
            alignItems: this.alignStyle(placement)
          }}
        >
          <Text>{value}</Text>
        </View>
      ) : (
          <Text key={type}>{value}</Text>
        );
    }

    return type === "center" ? null : <View key={type} />;
  }


  populateChildren(propChildren, placement, centerComponentStyle) {
    const childrenArray = [];

    const headerLeft = this.generateChild(
      propChildren.headerLeft,
      "left"
    );
    const headerCenter = this.generateChild(
      propChildren.headerCenter,
      "center",
      placement,
      centerComponentStyle
    );
    const headerRight = this.generateChild(
      propChildren.headerRight,
      "right"
    );

    childrenArray.push(headerLeft, headerCenter, headerRight);

    return childrenArray;
  }

  render() {
    const {
      placement,
      headerLeft,
      headerCenter,
      headerRight
    } = this.props;

    // prop children will have the values of headerLeft, headerCenter, headerRight
    let propChildren = [];

    if (headerLeft || headerCenter || headerRight) {
      propChildren = this.populateChildren(
        {
          headerLeft,
          headerCenter,
          headerRight
        },
        placement,
      )
    }

    return (
      <View style={header.headerOuterContainer}>
        {/* <Text style={text.headerText}> {text} </Text> */}
        { propChildren }
      </View>
    );
  }
}

export default Header;
