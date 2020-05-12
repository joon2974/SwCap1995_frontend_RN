import React, { Component } from 'react';
import { 
  View,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';
import FriendList from './FriendComponents/FriendList';
  
export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendData: [],
    };
  }

  componentDidMount() { 
    this.getFriends(1);
  }

  getFriends = async (userID) => {
    try {
      console.log('시작');
      const response = await axios.get('http://49.50.172.58:3000/friends/' + userID);
      console.log(response.data.rows);
      
      const responseJson = await response.data.rows;

      await this.setState({
        friendData: responseJson,
      });
    } catch (error) {
      console.error(error);
      console.error('오류');
    }
  }


  render() {
    const friends = this.state.friendData.map((data) => (
      <FriendList
        nickname={data.nickname}
        />
    ));
    return (
      <View style={styles.container}>
        <Button
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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
