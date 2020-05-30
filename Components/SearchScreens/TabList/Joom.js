/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,

  Image,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Joom extends Component {
  render() {
    return (
      <View>
          
        <Image 
          style={{ width: width, height: height, resizeMode: 'contain' }}
          source={{ uri: this.props.route.params.image_url }}  
        />
      </View>
      
    );
  }
}
