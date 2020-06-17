import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class AuthWatcher extends Component {
  render() {
    const uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6mNjNuuWUdzd5TSnJCzZVxeaH0H-QZG6TK0LtjfOVTD60e7Jo&usqp=CAU';
    let emoticon = null;
    if (this.props.emoticon === 1) {
      emoticon = (
        <Image style={styles.emoticonStyle} source={require('../../HomeScreens/emoticons/emoticon1.png')} />
      );
    } else if (this.props.emoticon === 2) {
      emoticon = (
        <Image style={styles.emoticonStyle} source={require('../../HomeScreens/emoticons/emoticon2.png')} />
      );
    } else if (this.props.emoticon === 3) {
      emoticon = (
        <Image style={styles.emoticonStyle} source={require('../../HomeScreens/emoticons/emoticon3.png')} />
      );
    } else if (this.props.emoticon === 4) {
      emoticon = (
        <Image style={styles.emoticonStyle} source={require('../../HomeScreens/emoticons/emoticon4.png')} />
      );
    } else if (this.props.emoticon === 5) {
      emoticon = (
        <Image style={styles.emoticonStyle} source={require('../../HomeScreens/emoticons/emoticon5.png')} />
      );
    }

   
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.explore}
        >
        <Image 
          source={{ uri: uri }} 
          style={styles.imageStyle}
            />
        <Text style={styles.watcherInfo}>
          {this.props.comment}
        </Text>

        {emoticon}
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.84,
    height: height / 12,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 4,
    borderRadius: 10,
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50, 50, 50)',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  
  imageStyle: {
    width: width * 0.12,
    height: height * 0.06,
    borderRadius: 10,
    marginLeft: 8,
  },
  emoticonStyle: {
    width: width * 0.08,
    height: height * 0.04,
    borderRadius: 10,
    marginLeft: 8,
  },

  watcherInfo: {
    marginLeft: 20,
    fontSize: 14,
  },
});
