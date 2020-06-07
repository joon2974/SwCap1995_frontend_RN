/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { CardNine } from '../SearchScreens/Cards';

const { width, height } = Dimensions.get('window');

export default class WatcherInfo extends Component {
  state = {
  }

  // sendPlanInfo = () => {
  //   const today = new Date();
  //   today.setDate(Number(this.props.route.params.startDate));

  //   axios
  //     .post('http://49.50.172.58:3000/plans', {
  //       headers: {
  //         'Content-type': 'application/x-www-form-urlencoded',
  //       },
  //       user_id: Number(this.props.route.params.userID),
  //       title: this.state.title,
  //       category: this.props.route.params.category,
  //       detailedCategory: this.props.route.params.planName,
  //       picture_rule_1: this.props.route.params.selectedMainRule,
  //       picture_rule_2: this.props.route.params.subRule1,
  //       picture_rule_3: this.props.route.params.subRule2,
  //       custom_picture_rule_1: '없음',
  //       custom_picture_rule_2: '없음',
  //       custom_picture_rule_3: '없음',
  //       plan_period: Number(this.props.route.params.endDate),
  //       picture_time: Number(this.props.route.params.certifyTime),
  //       plan_start_day: today,
  //       bet_money: Number(this.props.route.params.challPoint),
  //       is_public: this.state.isPublic,
  //       percent: Number(this.props.route.params.percent),
  //       spectors: this.props.route.params.spectors.join(),
  //       distribMethod: this.props.route.params.distribMethod,
  //     })
  //     .then((res) => {
  //       console.log(res.status);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle} style={{ marginBottom: 40 }}>
       
        <CardNine
          title="카테고리 이름"
          subTitle="서브 타이틀"
          description="설명"
          image={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
             />

        <View style={styles.lineDivider} />

        <View style={styles.timeContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>날짜 / 시간</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>시작 날짜:  </Text>
            <Text>
              ffffffffffffffffff
              {' '}
              일
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>플랜 기간:  </Text>
            <Text>
              aaaaaaaaaaaaa
              {' '}
              주
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>인증 시간:  </Text>
            <Text>
              ssssssssssssssssssssss
              {' '}
              시(앞 뒤로 30분의 여유시간이 주어집니다)
            </Text>
          </View>
        </View>

        <View style={styles.lineDivider} />


        <CardNine
          title="인증 룰"
          subTitle="룰 서브"
          description="설명"
          image={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }}
             />


        <View style={styles.lineDivider} />

        <View style={styles.pointContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>도전 포인트:  </Text>
            <Text>fffffffffffff</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>차감 %:  </Text>
            <Text>wwwwwwwwwwww</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>분배 방식:  </Text>
            <Text>eeeeeeeeeeeeeeeee</Text>
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
