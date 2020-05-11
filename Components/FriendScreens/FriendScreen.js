import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';

  
export default class FriendScreen extends Component {
  getFriends = (userID) => {
    axios.get('http://49.50.172.58:3000/friends', {
      params: { userID },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{ marginTop: 10 }}
          title="친구 목록받아오기"
          onPress={() => this.getFriends(1)
            }
           />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
