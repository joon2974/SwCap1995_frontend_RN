import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class FriendList extends Component {
  render() {
    return (

      <View style={styles.container}>
        <Text style={styles.textContainer}>
          {this.props.nickname}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row', // row
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'space-around', // center, space-around
    marginBottom: 5,
    borderWidth:1,
  },
  textContainer: {
    color: 'black',
  },
});
