/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Joom extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          여기는 줌
        </Text>
      </View>
      
    );
  }
}
