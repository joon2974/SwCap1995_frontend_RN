import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class CategoryListEach extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={() => this.props.onPressFunc}  
      >
        <Text>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.18,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5,
  },
});
