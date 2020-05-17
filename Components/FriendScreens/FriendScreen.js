import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Button,
  Dimensions,
  Text,
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

    };
    this.stateRefresh = this.stateRefresh.bind(this);
  }


  componentDidMount() { 
    this.getFriends(1);
  }

  
  getFriends = async (userID) => {
    const response = await axios.get('http://49.50.172.58:3000/friends/' + userID);
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    var friendarray;
    var friendRequestarray;
    console.log(count);
    console.log(response.data);
    try { 
      for (var i = 0; i < count; i++) {
        const obj = { nickname: responseJson[i].nickname };
        friendarray = this.state.friendData.concat(obj);
        this.setState({
          friendData: friendarray,
        });
      }
    } catch (error) {
      console.error(error);
    }
    console.log(friendarray);
    const requestresponse = await axios.get('http://49.50.172.58:3000/friends/waiting/' + userID);
    const requestresponseJson = await requestresponse.data.rows[0].friend;
    const requestcount = await response.data.count;
    try {
      for (var k = 0; k < requestcount; k++) {
        const obj = { nickname: requestresponseJson[k].user_id };
        friendRequestarray = this.state.friendRequstData.concat(obj);
        this.setState({
          friendRequstData: friendRequestarray,
        });
      }
    } catch (error) {
      console.error(error);
    }
    
    console.log(friendRequestarray);
  }

  stateRefresh() {
    this.getFriends(1);
  }

  render() {
    const friends = this.state.friendData.map((data) => (
      <FriendList
        key={data.nickname}
        nickname={data.nickname}
        />
    ));
    const friendRequsts = this.state.friendRequstData.map((data) => (
      <FriendRequestList
        stateRefresh={this.stateRefresh}
        key={data.nickname}
        nickname={data.nickname}
        />
    ));
    return (
      <View style={styles.container}>
        <View style={styles.friendRequetContainer}>
          <Text>친구 요청 목록</Text>
        </View>
        <View>
          {friendRequsts}
        </View>
        <View style={styles.friendContainer}>
          <Text>친구 목록</Text>
        </View> 
        <View>
          {friends}
        </View>
        <Button
          buttonStyle={styles.addFriendButton}
          title="친구추가"
          onPress={() => this.props.navigation.navigate('AddFriend')}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addFriendButton: {
    width: width,
  },
  friendRequetContainer: {
    width: width,
    alignItems: 'center',
    borderBottomWidth: 2,
    marginBottom: 20,
    borderBottomColor: 'black',
  },
  friendContainer: {
    width: width,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomColor: 'black',
  },
});
