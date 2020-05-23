import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Dimensions,
  Text,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import FriendList from './FriendComponents/FriendList';
import FriendRequestList from './FriendComponents/FriendRequestList';

const { width } = Dimensions.get('window');
export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
      friendRequstData: [],
      userId: '1',
    };
  }

  componentDidMount() {
    this.loadUserID();
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;
      this.getFriends(id);
    });
  };

  getFriends = async (userID) => {
    this.setState({ friendData: [], friendRequstData: [] });
    console.log('유저아이디1', userID);
    const response = await axios.get(
      'http://49.50.172.58:3000/friends/' + userID,
    );
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    var friendarray;
    var friendRequestarray;
    console.log(count);
    console.log(response.data);
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          const obj = { nickname: responseJson[i].nickname };
          friendarray = this.state.friendData.concat(obj);
          this.setState({
            friendData: friendarray,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
    console.log(friendarray);
    const requestresponse = await axios.get(
      'http://49.50.172.58:3000/friends/waiting/' + userID,
    );
    const requestcount = await requestresponse.data.count;
    const requestresponseJson = await requestresponse.data.rows;
    console.log('카운트', requestcount);
    console.log('데이터', requestresponse.data);
    try {
      if (requestcount !== 0) {
        for (var k = 0; k < requestcount; k++) {
          const obj = { nickname: requestresponseJson[k].nickname };
          friendRequestarray = this.state.friendRequstData.concat(obj);
          this.setState({
            friendRequstData: friendRequestarray,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
    console.log('유저아이디2: ', userID);
    console.log(friendRequestarray);
  };

  update1() {
    this.forceUpdate();
  }

  update2() {
    this.forceUpdate();
  }

  render() {
    const { userId, friendData, friendRequstData } = this.state;
    const friends = friendData.map((data) => (
      <FriendList
        key={data.nickname}
        nickname={data.nickname}
        userId={userId}
      />
    ));
    const friendRequsts = friendRequstData.map((data) => (
      <FriendRequestList
        key={data.nickname}
        nickname={data.nickname}
        userId={userId}
      />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.addFriendButton}
            title="새로고침"
            type="outline"
            onPress={() => {
              this.loadUserID().then(function () {
                alert('새로고침을 했습니다');
              });
            }}
          />
        </View>
        <Button
          buttonStyle={styles.addFriendButton}
          title="친구추가 하러가기"
          onPress={() => {
            this.props.navigation.navigate('AddFriend', { userId: userId });
          }}
        />
        <View style={styles.friendRequetContainer}>
          <Text>친구 요청 목록</Text>
        </View>
        <View>{friendRequsts}</View>

        <View style={styles.friendContainer}>
          <Text>친구 목록</Text>
        </View>
        <View>{friends}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addFriendButton: {
    width: width,
  },
  friendRequetContainer: {
    width: width,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: 'black',
  },
  friendContainer: {
    width: width,
    alignItems: 'center',
    borderTopWidth: 2,
    borderBottomColor: 'black',
  },
  buttonContainer: {
    marginBottom: 5,
  },
});
