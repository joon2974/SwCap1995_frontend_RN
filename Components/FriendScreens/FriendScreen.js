import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Button,
  Dimensions,
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
    try {
      for (var i = 0; i < 3; i++) {
        if (responseJson[i].friend[0].isaccept === 'accept') {
          const obj = { nickname: responseJson[i].nickname };
          friendarray = this.state.friendData.concat(obj);
          this.setState({
            friendData: friendarray,
          });
          console.log(this.state.friendData);
        } else {
          const obj = { nickname: responseJson[i].nickname };
          friendRequestarray = this.state.friendRequstData.concat(obj);
          this.setState({
            friendRequstData: friendRequestarray,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }


  render() {
    const friends = this.state.friendData.map((data) => (
      <FriendList
        nickname={data.nickname}
        />
    ));
    const friendRequsts = this.state.friendRequstData.map((data) => (
      <FriendRequestList
        nickname={data.nickname}
        />
    ));
    return (
      <View style={styles.container}>
        <View>
          {friendRequsts}
        </View>
        <Button
          buttonStyle={styles.addFriendButton}
          title="친구추가"
          onPress={() => this.props.navigation.navigate('AddFriend')}
        />
        <View>
          {friends}
        </View>
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
});
