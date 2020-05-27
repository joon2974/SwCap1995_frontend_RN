import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import axios from 'axios';
import TimePicker from './PlanComponents/TimePicker';
import RulePicker from './PlanComponents/RulePicker';

const { height, width } = Dimensions.get('window');

export default class PlanMain extends Component {
  state = {
    startDate: '05-23',
    endDate: '1주',
    certifyTime: '09시 ~ 11시',
    certifyImageUri: 'https://ifh.cc/g/BHltgC.jpg',
    pictureRules: {
      '찬물에 손 씻기': [
        '자신의 손이 보일 것',
        '차가울 물임을 증명할 것',
      ],
      '메모지에 시간과 글 쓰기': [
        '손글씨 일 것',
        '일어났을 때의 시간을 쓸 것',
      ],
    },
    selectedMainRule: '찬물에 손 씻기',
    timeList: [],
    periodList: [],
    dateList: [],
  }

  componentDidMount() {
    this.setDateData();
  }

  setDateData = async () => {
    const timeList = [];
    for (let i = 0; i < 23; i++) {
      timeList.push(i.toString() + '시 ~ ' + (i + 1).toString() + '시');
    }

    const periodList = [];
    for (let i = 1; i < 5; i++) {
      periodList.push(i.toString() + '주');
    }

    const dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const today = new Date();
    const year = today.getFullYear();
    if ((year % 4) === 0) {
      dayCount[1] = 29;
    }
    const month = today.getMonth();
    const day = today.getDate();
    const dateList = [];
    for (let i = day; i < dayCount[month] + 1; i++) {
      dateList.push(i.toString());
    }

    this.setState({ timeList: timeList, periodList: periodList, dateList: dateList });
  }

  // 추후 rules 개념 확정 지으면 수정할 것
  // pictureRules를 재할당 하는 async 함수
  loadRulesFromServer = async () => {
    await axios.get('http://49.50.172.58:3000/').then((data) => {
      const rulesFromServer = data.data.data.detailedCategoryGet;
      const ruleObject = {};

      ruleObject['운동/건강'] = this.planFilter(rulesFromServer, 1);
      ruleObject['감정관리'] = this.planFilter(rulesFromServer, 4);
      ruleObject['생활습관'] = this.planFilter(rulesFromServer, 2);
      ruleObject['자기계발'] = this.planFilter(rulesFromServer, 3);
      ruleObject['기타'] = this.planFilter(rulesFromServer, 5);

      this.setState({ pictureRules: ruleObject });
      console.log('서버로부터 받아온 plan 목록: ', this.state.pictureRules);
    })
      .catch((error) => {
        console.log('서버로부터 plans 가져오기 에러: ', error);
      });
  }

  // 수정 요
  planFilter = (plansList, categoryNum) => {
    const categoryPlans = plansList.filter((plan) => plan.topCategoryNum === categoryNum);
    const categoryPlansName = categoryPlans.map((plan) => plan.detailedCategory);

    return categoryPlansName;
  }

  mainRuleFilter = (pictureRules) => Object.keys(pictureRules)

  render() {
    const {
      startDate,
      endDate,
      certifyTime,
      certifyImageUri,
      pictureRules,
      selectedMainRule,
      timeList,
      periodList,
      dateList,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.selectedInformContainer}>
            <Image 
              source={{ uri: this.props.route.params.uri }} 
              style={styles.imageStyle}
            />
            <View style={styles.infoTitle}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.route.params.category}</Text>
              <Text>{this.props.route.params.planName}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.timesContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>시간 선택</Text>
            </View>
            <View style={styles.timePickerContainer}>
              <View style={styles.eachTimesContainer}>
                <Text>시작일</Text>
                <TimePicker 
                  time={startDate}
                  onValueChange={(itemValue) => this.setState({ startDate: itemValue })}
                  times={dateList}
                />
              </View>
              <View style={styles.eachTimesContainer}>
                <Text>도전 기간</Text>
                <TimePicker 
                  time={endDate}
                  onValueChange={(itemValue) => this.setState({ endDate: itemValue })}
                  times={periodList}
                />
              </View>
              <View style={styles.eachTimesContainer}>
                <Text>인증 시간</Text>
                <TimePicker 
                  time={certifyTime}
                  onValueChange={(itemValue) => this.setState({ certifyTime: itemValue })}
                  times={timeList}
                />
              </View>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.ruleContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>인증 조건 선택</Text>
            </View>
            <Image 
              source={{ uri: certifyImageUri }} 
              style={styles.certifyImageStyle}
            />
            <Text>인증 사진 예시</Text>
            <View style={styles.lineDivider} />
            <View style={styles.rulePickContainer}>
              <RulePicker 
                rule={selectedMainRule}
                onValueChange={(itemValue) => this.setState({ selectedMainRule: itemValue })}
                rules={this.mainRuleFilter(pictureRules)}
                pickerWidth={width}
              />
              <View style={styles.subRuleContainer}>
                <Text>{pictureRules[selectedMainRule][0]}</Text>
              </View>
              <View style={styles.subRuleContainer}>
                <Text>{pictureRules[selectedMainRule][1]}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.nextStepBtn}
            onPress={() => this.props.navigation.navigate('MakePlanStep2',
              {
                category: this.props.route.params.category,
                planName: this.props.route.params.planName,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                certifyTime: this.state.certifyTime,
                selectedMainRule: this.state.selectedMainRule,
                subRule1: this.state.pictureRules[this.state.selectedMainRule][0],
                subRule2: this.state.pictureRules[this.state.selectedMainRule][1],
                certifyImgUri: this.state.certifyImageUri,
                userID: this.props.route.params.userID,
              })}
          >
            <Text style={{ fontWeight: 'bold' }}>다음 단계로</Text>
          </TouchableOpacity>
        </View>
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
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  selectedInformContainer: {
    flexDirection: 'row',
    width: width,
    height: height / 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 25,
  },
  infoTitle: {
    width: width - 80,
    height: height / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentTitleContainer: {
    width: width - 20,
    height: 30,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
  },
  timesContainer: {
    width: width,
    height: height / 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  timePickerContainer: {
    flexDirection: 'row',
    width: width,
    height: height / 6,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  eachTimesContainer: {
    width: width / 3,
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleContainer: {
    width: width,
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  certifyImageStyle: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: 20,
    marginTop: 10,
  },
  rulePickContainer: {
    width: width,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subRuleContainer: {
    width: width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextStepBtn: {
    width: width / 2,
    height: 40,
    backgroundColor: '#00FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 30,
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
