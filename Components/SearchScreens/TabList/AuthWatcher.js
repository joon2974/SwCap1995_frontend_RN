import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class AuthWatcher extends Component {
  state = {
    reportStatus: 0,
  }
  
  sendReport = () => {
    console.log(this.props.dailyAuthID);
        
    if (this.state.reportStatus === 0) {
      axios
        .post('http://49.50.172.58:3000/report_judges', {
          headers: {
            'content-type': 'x-www-form-urlencoded',
          },
          daily_auth_id: this.props.dailyAuthID,
          plan_id: this.props.planID,
          status: this.props.status,
        })
        .then(() => {
        })
        .catch(() => {

        });
  
      this.setState({ reportStatus: 1 });      
      alert('신고 접수가 완료 되었습니다');
    } else {
      alert('이미 신고가 접수되었습니다.');
    }
  }

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

    let watchingResult = null;
    if (this.props.isCorrect === false) {
      watchingResult = (
        <View style={{ flexDirection: 'row' }}>
        
          <View style={{  
            alignItems: 'center', 
            justifyContent: 'center',
            height: height / 34,
            width: width / 6,
            backgroundColor: '#fd8a69',
            borderRadius: 10,
            marginRight: 5, 
          }}>   
            <Text style={{ color: 'white' }}>
              reject
            </Text>     
          </View>
          
          <TouchableOpacity 
            style={{ height: height / 34, width: width / 15 }}
            onPress={() => this.sendReport()}
          >
            <FontAwesome name="send-o" size={18} style={{ marginLeft: 5, marginTop: 2 }} />
          </TouchableOpacity>
        </View>
      );
    } else {
      watchingResult = (
        
        <View style={{  
          alignItems: 'center', 
          justifyContent: 'center',
          height: height / 34,
          width: width / 6,
          backgroundColor: 'green',
          borderRadius: 10,
          marginRight: 5, 
        }}>   
          <Text style={{ color: 'white' }}>
            accept
          </Text>     
        </View> 
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
        <View style={{ width: width / 1.5 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.watcherInfo}>
              {this.props.comment}
            </Text>
            {emoticon}
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            {watchingResult}
          </View>
        </View>
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
