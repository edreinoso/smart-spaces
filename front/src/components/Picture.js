import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { colors } from '../styles/index';


class Picture extends Component {
  render() {
    const { image, widthHeight, radius } = this.props;
    return (
      <Image source={image} style={[styles.imageRenderFrame, { height: widthHeight, width: widthHeight, borderRadius: radius }]} />
    );
  }
}

const styles = StyleSheet.create({
  imageRenderFrame: {
    borderColor: colors.grey,
    borderWidth: 1,
    // margin: 10
  }
});

export default Picture;