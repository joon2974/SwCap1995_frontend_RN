import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

export default class FriendListEach extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.friendSelectFunc}  
      >
        <Text style={{ color: 'white' }}>{this.props.name}</Text>
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
    backgroundColor: '#FD8A69',
    borderRadius: 5,
    margin: 3,
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
