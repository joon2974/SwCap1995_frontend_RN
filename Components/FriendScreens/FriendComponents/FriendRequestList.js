import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default class FriendRequestList extends Component {
    acceptRequet=(userId, targetNickname) => {
      axios.patch('http://49.50.172.58:3000/friends/response', {
        user_id: userId,
        nickname: targetNickname,
        is_accept: 'accept',
      }).then(() => {
        this.props.onRefresh();
      });
    }

    rejectRequet=(userId, targetNickname) => {
      console.log(this.props);
      axios.patch('http://49.50.172.58:3000/friends/response', {
        user_id: userId,
        nickname: targetNickname,
        is_accept: 'reject',
      }).then(() => {
        this.props.onRefresh();
      });
    }

    render() {
      const { nickname, userId } = this.props;

      return (
    
        <View style={styles.container}>
          <View style={styles.ImageContainer}>
            <Image 
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6mNjNuuWUdzd5TSnJCzZVxeaH0H-QZG6TK0LtjfOVTD60e7Jo&usqp=CAU' }} 
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.nickNameContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{nickname}</Text>
            </View>
            <View style={styles.BtnContainer}>
              <TouchableOpacity 
                style={styles.btnAcceptStyle}
                onPress={() => this.acceptRequet(userId, nickname)
                }
              >
                <Text>수락</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.btnRejectStyle}
                onPress={() => this.rejectRequet(userId, nickname)}
              >
                <Text>거부</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 70,
    flexDirection: 'row', // row
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 5,
  },
  ImageContainer: {
    width: width * 0.25,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 15,
  },
  InfoContainer: {
    width: width * 0.75,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickNameContainer: {
    width: width * 0.7,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  BtnContainer: {
    width: width * 0.7,
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    flexDirection: 'row',
  },
  btnAcceptStyle: {
    width: 60,
    height: 25,
    backgroundColor: '#A9E2F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 20,
  },
  btnRejectStyle: {
    width: 60,
    height: 25,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
