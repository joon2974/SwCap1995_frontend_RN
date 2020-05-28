import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
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
    height: 35,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 25,
    marginRight: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
