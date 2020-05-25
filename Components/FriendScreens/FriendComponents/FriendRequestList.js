import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Button, 
} from 'react-native';

import axios from 'axios';

export default class FriendRequestList extends Component {
    acceptRequet=(userId, targetNickname) => {
      console.log('프롭스', this.props);
      console.log('닉네임', targetNickname);
      console.log('유저아이디', userId);
      
      axios.patch('http://49.50.172.58:3000/friends/response', {
        user_id: userId,
        nickname: targetNickname,
        is_accept: 'accept',
      }).then(function () {
      });
    }

    rejectRequet=(userId, targetNickname) => {
      console.log('닉네임', targetNickname);
      axios.patch('http://49.50.172.58:3000/friends/response', {
        user_id: userId,
        nickname: targetNickname,
        is_accept: 'reject',
      }).then(function () {
      });
    }

    render() {
      const { nickname, userId } = this.props;

      
      return (
    
        <View style={styles.container}>
          <Text style={styles.textContainer}>
            {nickname}
          </Text>
          <Button
            title="수락"
            onPress={() => this.acceptRequet(userId, nickname)}
        />
          <Button
            title="거부"
            onPress={() => this.rejectRequet(userId, nickname)}
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
