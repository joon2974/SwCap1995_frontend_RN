/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlightBase,
} from 'react-native';
import axios from 'axios';
import { CardNine } from '../SearchScreens/Cards';

const { width, height } = Dimensions.get('window');

const categoryURI = [
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%86%BC.jpg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%89%E1%85%A2%E1%86%BC%E1%84%92%E1%85%AA%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%80%E1%85%AA%E1%86%AB.jpg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%8C%E1%85%A1%E1%84%80%E1%85%B5%E1%84%80%E1%85%A8%E1%84%87%E1%85%A1%E1%86%AF.jpeg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%80%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.jpeg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%80%E1%85%B5%E1%84%90%E1%85%A1.jpeg',
];


export default class WatcherInfo extends Component {
  state = {
    testArray: [],
    titleURI: 'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%89%E1%85%A2%E1%86%BC%E1%84%92%E1%85%AA%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%80%E1%85%AA%E1%86%AB.jpg',
  }

  componentDidMount() {
    this.setTest();
  }

  setTitle = () => {
    if (this.state.testArray.category === '운동/건강') this.setState({ titleURI: categoryURI[0] });
    else if (this.state.testArray.category === '생활습관') this.setState({ titleURI: categoryURI[1] });
    else if (this.state.testArray.category === '자기계발') this.setState({ titleURI: categoryURI[2] });
    else if (this.state.testArray.category === '감정관리') this.setState({ titleURI: categoryURI[3] });
    else if (this.state.testArray.category === '기타') this.setState({ titleURI: categoryURI[4] });
  }

  setTest = () => {
    axios.get('http://49.50.172.58:3000/plans/' + this.props.planData.id).then((res) => {
      this.setState({ testArray: res.data });
      this.setTitle();
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }  

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle} style={{ marginBottom: 40 }}>
       
        <CardNine
          title={this.state.testArray.title}
          subTitle={this.state.testArray.category} 
          description={this.state.testArray.custom_picture_rule_3} // description => subtitle 
          image={{ uri: this.state.titleURI }}
        />

        <View style={styles.lineDivider} />

        <View style={styles.timeContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>날짜 / 시간</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>시작 날짜:  </Text>
            <Text>
              {this.state.testArray.plan_start_day}
              {' '}
              일
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>플랜 기간:  </Text>
            <Text>
              {this.state.testArray.plan_period}
              {' '}
              주
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>인증 시간:  </Text>
            <Text>
              {this.state.testArray.picture_time}
              {' '}
              시(앞 뒤로 30분의 여유시 간이 주어집니다)
            </Text>
          </View>
        </View>

        <View style={styles.lineDivider} />


        <CardNine
          title="인증 룰"
          subTitle={this.state.testArray.picture_rule_1 + '\n' + this.state.testArray.picture_rule_2 + '\n' + this.state.testArray.picture_rule_3}
          image={{ uri: this.state.testArray.image_url }} />


        <View style={styles.lineDivider} />

        <View style={styles.pointContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>도전 포인트:  </Text>
            <Text>{this.state.testArray.bet_money}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>차감 %:  </Text>
            <Text>{this.state.testArray.percent}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>분배 방식:  </Text>
            <Text>{this.state.testArray.distrib_method}</Text>
          </View>
        </View>

        <View style={styles.lineDivider} />

        <View style={styles.friendsContainer}>
          <View style={styles.friendtitle}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>감시자  </Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              {'\n내용내용내용내용\n내용내용내용내용'}
            </Text>
          </View>
          
        </View>

        <View style={styles.lineDivider} />


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  scrollViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 15,
  },
  componentTitleContainer: {
    width: width - 20,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
  },
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width - 20,
    height: height / 17,
    flexDirection: 'row',
    marginLeft: 10,
  },
  friendtitle: {
    width: 80,
    height: 40,
    marginLeft: 5,
  },
  pointContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
  },
  friendsContainer: {
    justifyContent: 'center',
    width: width,
  },
  titleContainer: {
    width: width,
    height: height * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
