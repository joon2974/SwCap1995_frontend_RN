import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class MyPageBtn extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.BtnStyle}
        onPress={this.props.btnFunc}
      >
        <Text>{this.props.btnName}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  BtnStyle: {
    width: width / 3.3,
    height: 45,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 25,
    marginRight: 5,
    borderWidth: 1,
  },
});
