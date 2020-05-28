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
        <View style={styles.ImageContainer}>
          <Image 
            source={{ uri: 'https://ifh.cc/g/BHltgC.jpg' }} 
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
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: width - 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 5,
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
  
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
  },
});
