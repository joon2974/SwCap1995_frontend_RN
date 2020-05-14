import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Button, 
} from 'react-native';

import axios from 'axios';

export default class FriendRequestList extends Component {
    acceptRequet=(userId, targetNickname) => {
      axios.patch('http://49.50.172.58:3000/friends/response', {
        user_id: userId,
        nickname: targetNickname,
        is_accept: 'accept',
      }).then(function () {
        this.props.stateRefresh();
      });
    }

    rejectRequet=(userId, targetNickname) => {
      axios.patch('http://49.50.172.58:3000/friends/response', {
        user_id: userId,
        nickname: targetNickname,
        is_accept: 'reject',
      }).then(function () {
        this.props.stateRefresh();
      });
    }

    render() {
      const nickname = this.props.nickname;
      return (
    
        <View style={styles.container}>
          <Text style={styles.textContainer}>
            {this.props.nickname}
          </Text>
          <Button
            title="수락"
            onPress={() => this.acceptRequet('1', nickname)}
        />
          <Button
            title="거부"
            onPress={() => this.rejectRequet('1', nickname)}
        />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row', // row
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5,
    borderWidth: 2,
  },
  textContainer: {
    color: 'black',
  },
});
