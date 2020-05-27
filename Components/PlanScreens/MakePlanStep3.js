import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import SpectorIcon from './PlanComponents/SpectorIcon';

const { width, height } = Dimensions.get('window');

export default class MakePlanStep3 extends Component {
  sendPlanInfo = () => {
    const today = new Date();
    today.setDate(Number(this.props.route.params.startDate));

    axios
      .post('http://49.50.172.58:3000/plans', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        user_id: Number(this.props.route.params.userID),
        title: '타이틀',
        category: this.props.route.params.category,
        detailedCategory: this.props.route.params.planName,
        picture_rule_1: this.props.route.params.selectedMainRule,
        picture_rule_2: this.props.route.params.subRule1,
        picture_rule_3: this.props.route.params.subRule2,
        custom_picture_rule_1: '없음',
        custom_picture_rule_2: '없음',
        custom_picture_rule_3: '없음',
        plan_period: Number(this.props.route.params.endDate),
        picture_time: Number(this.props.route.params.certifyTime),
        plan_start_day: today,
        bet_money: Number(this.props.route.params.challPoint),
        is_public: false,
        percent: Number(this.props.route.params.percent),
        spectors: this.props.route.params.spectors.join(),
        distribMethod: this.props.route.params.distribMethod,
      })
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.scrollViewStyle}>
        <View style={styles.container}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryImgContainer}>
              <Image 
                source={{ uri: this.props.route.params.categoryUri }} 
                style={styles.imageStyle}
              />
            </View>
            <View style={styles.categoryInfoContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{this.props.route.params.category}</Text>
              <Text>{this.props.route.params.planName}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.timeContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>날짜 / 시간</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 15 }}>시작 날짜:  </Text>
              <Text>{this.props.route.params.startDate}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 15 }}>플랜 기간:  </Text>
              <Text>{this.props.route.params.endDate}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 15 }}>인증 시간:  </Text>
              <Text>{this.props.route.params.certifyTime}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.ruleContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>인증 Rule</Text>
            </View>
            <View style={styles.rulesContainerStyle}>
              <View style={styles.categoryImgContainer}>
                <Image 
                  source={{ uri: this.props.route.params.certifyImgUri }} 
                  style={styles.imageStyle}
                />
              </View>
              <View style={styles.categoryInfoContainer}>
                <Text>{this.props.route.params.selectedMainRule}</Text>
                <Text>{this.props.route.params.subRule1}</Text>
                <Text>{this.props.route.params.subRule2}</Text>
              </View>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.pointContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 17 }}>도전 포인트:  </Text>
              <Text>{this.props.route.params.challPoint}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 17 }}>차감 %:  </Text>
              <Text>{this.props.route.params.minusPercent}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={{ fontWeight: '800', fontSize: 17 }}>분배 방식:  </Text>
              <Text>{this.props.route.params.distribMethod}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.friendsContainer}>
            <View style={styles.friendtitle}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>감시자  </Text>
            </View>
            <View style={styles.friends}>
              {this.props.route.params.spectors.map((friend) => (
                <SpectorIcon 
                  key={friend}
                  nickName={friend}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
            style={styles.nextStepBtn}
            onPress={() => {
              this.sendPlanInfo();
              this.props.navigation.popToTop();
            }}
          >
            <Text>플랜 생성하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
  container: {
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
  categoryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
    flexDirection: 'row',
  },
  categoryImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.3,
    height: height * 0.2,
  },
  imageStyle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 20,
    marginLeft: 20,
  },
  categoryInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.7,
    height: height * 0.2,
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
  friends: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width - 100,
    height: height / 12,
    flexDirection: 'row',
    marginLeft: 10,
    flexWrap: 'wrap',
  },
  ruleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
    marginTop: 5,
  },
  rulesContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
    flexDirection: 'row',
  },
  pointContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.2,
  },
  friendsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height * 0.10,
    flexDirection: 'row',
  },
  nextStepBtn: {
    width: width / 2,
    height: 40,
    backgroundColor: '#00FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 10,
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
});
