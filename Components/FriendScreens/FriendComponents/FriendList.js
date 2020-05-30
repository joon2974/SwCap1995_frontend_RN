import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default class FriendList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.notLineContainer}>
          <View style={styles.ImageContainer}>
            <Image 
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6mNjNuuWUdzd5TSnJCzZVxeaH0H-QZG6TK0LtjfOVTD60e7Jo&usqp=CAU' }} 
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.InfoContainer}>
            <View style={styles.nickNameContainer}>
              <Text style={{ fontSize: 22 }}>{this.props.nickname}</Text>
            </View>
            <Feather name="more-horizontal" size={24} color="black" />
          </View>
        </View>
        <View style={styles.lineDivider} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  notLineContainer: {
    width: width - 20,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 15,
  },
  ImageContainer: {
    width: 65,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  InfoContainer: {
    width: width * 0.70,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nickNameContainer: {
    height: 35,
    justifyContent: 'center',
    marginLeft: 10,
  },
  emailContainer: {
    height: 25,
    justifyContent: 'center',
    marginLeft: 10,
  },
});
