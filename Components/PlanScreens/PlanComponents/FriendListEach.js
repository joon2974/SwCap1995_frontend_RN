import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default class FriendListEach extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.friendSelectFunc}  
      >
        <Text>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9F5A9',
    borderRadius: 5,
    margin: 3,
  },
});
