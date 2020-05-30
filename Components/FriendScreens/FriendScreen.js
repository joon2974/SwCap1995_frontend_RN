import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import FriendList from './FriendComponents/FriendList';
import FriendRequestList from './FriendComponents/FriendRequestList';

const { width, height } = Dimensions.get('window');
export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      friendData: [],
      friendRequstData: [],
      userId: '1',
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadUserID();
  }

  onRefresh = () => {
    this.setState({
      friendData: [],
      friendRequstData: [],
    });
    this.setState({ refreshing: true });
    this.getFriends(this.state.userId).then(() => {
      this.setState({ refreshing: false });
    });
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.setState({ userId: id });
      this.getFriends(id);
    });
  };

  getFriends = async (userID) => {
    const response = await axios.get(
      'http://49.50.172.58:3000/friends/' + userID,
    );
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    var friendarray = [];
    var friendRequestarray = [];
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          const obj = {
            nickname: responseJson[i].nickname, 
            email: responseJson[i].email,
            id: responseJson[i].id, 
          };
          friendarray.push(obj);
        }
        this.setState({
          friendData: friendarray,
        });
      }
    } catch (error) {
      console.error(error);
    }
    const requestresponse = await axios.get(
      'http://49.50.172.58:3000/friends/waiting/' + userID,
    );
    console.log(requestresponse.data);
    const requestcount = await requestresponse.data.count;
    const requestresponseJson = await requestresponse.data.rows;
    try {
      if (requestcount !== 0) {
        for (var k = 0; k < requestcount; k++) {
          const obj = { nickname: requestresponseJson[k].nickname, id: requestresponseJson[k].id };
          friendRequestarray.push(obj);
        }
        this.setState({
          friendRequstData: friendRequestarray,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { userId, friendData, friendRequstData } = this.state;
    const friends = friendData.map((data) => (
      <FriendList
        key={data.id}
        nickname={data.nickname}
        email={data.email}
        userId={userId}
      />
    ));
    const friendRequsts = friendRequstData.map((data) => (
      <FriendRequestList
        key={data.id}
        nickname={data.nickname}
        userId={userId}
        onRefresh={this.onRefresh}
/>
    ));
    return (
      <ScrollView
        style={styles.container}
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="white"
      />
    )}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.titleCotainer}>
            <View style={styles.titleContainerSmall}>
              <Text style={styles.titleStyle}>친구</Text>
            </View>
            <TouchableOpacity 
              style={styles.iconContainer}
              onPress={() => {
                this.loadUserID().then(function () {
                  alert('새로고침을 했습니다');
                });
              }}
            >
              <Ionicons 
                name="md-refresh"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.addFriendContainer}>
            <TouchableOpacity 
              style={styles.addBtnStyle}
              onPress={() => {
                this.props.navigation.navigate('친구 추가', { userId: userId });
              }}
            >
              <Text>친구추가 하러 가기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.lineDivider} />

        <ScrollView>
          <View style={styles.friendRequetContainer}>
            <View style={styles.titleContainerSmall}>
              <Text style={styles.titleStyle}>친구 요청</Text>
            </View>
            {friendRequsts}
          </View>
        </ScrollView>

        <View style={styles.lineDivider} />

        <ScrollView>
          <View style={styles.friendRequetContainer}>
            <View style={styles.titleContainerSmall}>
              <Text style={styles.titleStyle}>친구 목록</Text>
            </View>
            {friends}
          </View>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  titleCotainer: {
    width: width - 10,
    height: height * 0.05,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
    flexDirection: 'row',
  },
  addFriendContainer: {
    width: width - 10,
    height: height * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  addBtnStyle: {
    width: 150,
    height: 40,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  iconContainer: {
    height: height * 0.05,
    width: 30,
    alignSelf: 'flex-end',
  },
  titleContainerSmall: {
    height: height * 0.05,
    width: width - 50,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  buttonContainer: {
    width: width,
    height: height * 0.15,
  },
  addFriendButton: {
    width: width,
  },
  friendRequestContainer: {
    width: width,
    height: height * 0.25,
  },
  friendRequetContainer: {
    width: width - 10,
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 5,
  },
  friendContainer: {
    width: width,
    height: height * 0.55,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
