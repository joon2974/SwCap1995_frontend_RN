import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import axios from 'axios';
import NoticeCard from './MyComponents/NoticeCard';

const { width, height } = Dimensions.get('window');

export default class noticeScreen extends Component {
  state = {
    noticeArray: [],
  };
  
  componentDidMount() {
    this.loadAllNotice();
  }

  loadAllNotice = async () => {
    const response = await axios.get(
      'http://49.50.172.58:3000/notices',
    );
    
    var noticeArray = [];
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          const obj = {
            title: responseJson[i].title, 
            content: responseJson[i].content,
            id: responseJson[i].id, 
          }; 
          noticeArray.push(obj);
        }
        this.setState({
          noticeArray: noticeArray,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const noticeArray = this.state.noticeArray;
    const notice = noticeArray.map((data) => (
      <NoticeCard
        key={data.title} 
        title={data.title}
        content={data.content}
        />
    ));
    return (
      <ScrollView
        style={styles.Container}
      
>
        <View style={{
          alignItems: 'center', backgroundColor: 'white', height: height, 
        }}>
          {notice}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    
  noticeContainer: {
    marginTop: 30,
    width: width * 0.9,
    height: height / 8,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
  Container: {
  },
});
