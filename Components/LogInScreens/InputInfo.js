import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class InputInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>정보입력</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
