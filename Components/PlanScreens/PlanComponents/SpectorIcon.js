import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

export default class SpectorIcon extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.nickName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 80,
    backgroundColor: '#F8E0F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
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
