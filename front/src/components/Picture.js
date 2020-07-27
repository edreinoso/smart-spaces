import React, { Component } from 'react';
import { Image } from 'react-native';
import { borders } from '../styles/index';


class Picture extends Component {
  render() {
    const { image, widthHeight, radius } = this.props;
    return (
      <Image source={image} style={[borders.grey, { height: widthHeight, width: widthHeight, borderRadius: radius }]} />
    );
  }
}

export default Picture;