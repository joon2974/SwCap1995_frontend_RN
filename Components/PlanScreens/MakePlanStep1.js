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
import ImageModal from 'react-native-image-modal';
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
      '찬물에 손 씻기': ['자신의 손이 보일 것', '차가울 물임을 증명할 것'],
      '메모지에 시간과 글 쓰기': ['손글씨 일 것', '일어났을 때의 시간을 쓸 것'],
    },
    selectedMainRule: '찬물에 손 씻기',
    timeList: [],
    periodList: [],
    dateList: [],
    ruleListFromServer: [],
    authenticationWay: null,
  };

  componentDidMount() {
    this.setDateData();
    this.loadRulesFromServer();
  }

  setDateData = async () => {
    const timeList = [];
    for (let i = 0; i < 23; i++) {
      timeList.push(i.toString());
    }

    const periodList = [];
    for (let i = 1; i < 5; i++) {
      periodList.push(i.toString());
    }

    const dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const today = new Date();
    const year = today.getFullYear();
    if (year % 4 === 0) {
      dayCount[1] = 29;
    }
    const month = today.getMonth();
    const day = today.getDate();
    const dateList = [];
    for (let i = day; i < dayCount[month] + 1; i++) {
      dateList.push(i.toString());
    }

    this.setState({
      timeList: timeList,
      periodList: periodList,
      dateList: dateList,
    });
  };

  loadRulesFromServer = async () => {
    await axios
      .get('http://49.50.172.58:3000/plan_templates')
      .then((data) => {
        const rulesFromServer = data.data.rows;
        this.setState({ ruleListFromServer: rulesFromServer });
        const ruleObject = {};
        let defaultRule;

        for (let i = 0; i < rulesFromServer.length; i++) {
          if (
            rulesFromServer[i].detailedCategory
            // eslint-disable-next-line eqeqeq
            == this.props.route.params.planName
          ) {
            const tempList = [];

            tempList.push(rulesFromServer[i].sub_rule_1);
            tempList.push(rulesFromServer[i].sub_rule_2);
            ruleObject[rulesFromServer[i].main_rule] = tempList;
          }
        }
        // eslint-disable-next-line prefer-const
        defaultRule = Object.keys(ruleObject)[0];
        this.setState({
          selectedMainRule: defaultRule,
          pictureRules: ruleObject,
        });

        let certifyPhotoUri;
        let authentication;
        for (let i = 0; i < rulesFromServer.length; i++) {
          if (rulesFromServer[i].main_rule === this.state.selectedMainRule) {
            certifyPhotoUri = rulesFromServer[i].image_url;
            authentication = rulesFromServer[i].authentication_way;
          }
        }
        this.setState({ certifyImageUri: certifyPhotoUri, authenticationWay: authentication });
      })
      .catch((error) => {
        console.log('서버로부터 template 가져오기 에러: ', error);
      });
  };

  mainRuleFilter = (pictureRules) => Object.keys(pictureRules);

  updateCertifyPhoto = (selectedMainRule) => {
    const ruleListFromServer = this.state.ruleListFromServer;
    console.log('룰 리스트 확인', ruleListFromServer);

    let certifyPhotoUri;
    let authentication;
    for (let i = 0; i < ruleListFromServer.length; i++) {
      if (ruleListFromServer[i].main_rule === selectedMainRule) {
        certifyPhotoUri = ruleListFromServer[i].image_url;
        authentication = ruleListFromServer[i].authentication_way;
      }
    }
    this.setState({ certifyImageUri: certifyPhotoUri, authenticationWay: authentication });
  };

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
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {this.props.route.params.category}
              </Text>
              <Text>{this.props.route.params.planName}</Text>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.timesContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                시간 선택
              </Text>
            </View>
            <View style={styles.timePickerContainer}>
              <View style={styles.eachTimesContainer}>
                <Text>시작일</Text>
                <TimePicker
                  time={startDate}
                  onValueChange={(itemValue) => this.setState({ startDate: itemValue })
                  }
                  times={dateList}
                />
              </View>
              <View style={styles.eachTimesContainer}>
                <Text>도전 기간(주)</Text>
                <TimePicker
                  time={endDate}
                  onValueChange={(itemValue) => this.setState({ endDate: itemValue })
                  }
                  times={periodList}
                />
              </View>
              <View style={styles.eachTimesContainer}>
                <Text>인증 시간(시)</Text>
                <TimePicker
                  time={certifyTime}
                  onValueChange={(itemValue) => this.setState({ certifyTime: itemValue })
                  }
                  times={timeList}
                />
              </View>
            </View>
          </View>

          <View style={styles.lineDivider} />

          <View style={styles.ruleContainer}>
            <View style={styles.componentTitleContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                인증 조건 선택
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <ImageModal
                style={styles.certifyImageStyle}
                source={{ uri: certifyImageUri }}
              />
              <Text>인증 사진 예시</Text>
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.rulePickContainer}>
              <RulePicker
                rule={selectedMainRule}
                onValueChange={(itemValue) => {
                  this.setState({ selectedMainRule: itemValue });
                  this.updateCertifyPhoto(itemValue);
                }}
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
            onPress={() => this.props.navigation.navigate('플랜 만들기: 2단계', {
              category: this.props.route.params.category,
              planName: this.props.route.params.planName,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              certifyTime: this.state.certifyTime,
              picture_rule_1: this.state.selectedMainRule,
              picture_rule_2: this.state.pictureRules[
                this.state.selectedMainRule
              ][0],
              picture_rule_3: this.state.pictureRules[
                this.state.selectedMainRule
              ][1],
              custom_picture_rule_1: null,
              custom_picture_rule_2: null,
              custom_picture_rule_3: null,
              certifyImgUri: this.state.certifyImageUri,
              userID: this.props.route.params.userID,
              categoryUri: this.props.route.params.uri,
              is_custom: false,
              authentication_way: this.state.authenticationWay,
            })
            }
          >
            <Text style={{ fontWeight: 'bold', color: 'white' }}>다음 단계로</Text>
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
    backgroundColor: '#FD8A69',
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
