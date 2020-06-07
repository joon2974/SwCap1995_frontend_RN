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
  TextInput,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import TimePicker from './PlanComponents/TimePicker';

const { height, width } = Dimensions.get('window');

export default class CustomMakePlanStep1 extends Component {
  state = {
    startDate: '',
    endDate: '',
    certifyTime: '',
    mainRule: '',
    subRule1: '',
    subRule2: '',
    timeList: [],
    periodList: [],
    dateList: [],
    planTitle: '',
    customImgUri: '',
  };

  componentDidMount() {
    this.setDateData();
  }

  setDateData = async () => {
    const timeList = [];
    for (let i = 0; i < 24; i++) {
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

  mainRuleFilter = (pictureRules) => Object.keys(pictureRules);

  updateCustomImgUri = (uri) => {
    this.setState({ customImgUri: uri });
  }

  render() {
    const {
      startDate,
      endDate,
      certifyTime,
      timeList,
      periodList,
      dateList,
      planTitle,
      customImgUri,
      mainRule,
      subRule1,
      subRule2,
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
              <TextInput
                value={planTitle}
                onChangeText={(title) => this.setState({ planTitle: title })}
                style={styles.input}
                placeholder="플랜 이름을 작성해주세요"
                keyboardType="email-address"
              />
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
            {(customImgUri.length !== 0) 
              ? (
                <View style={{ alignItems: 'center' }}>
                  <ImageModal
                    style={styles.certifyImageStyle}
                    source={{ uri: customImgUri }}
                  />
                  <Text>인증 사진 예시</Text>
                </View>
              ) 
              : (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ marginBottom: 10, marginTop: 10 }}>인증 사진을 등록해 주세요!</Text>
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity 
                      style={styles.registerBtn}
                      onPress={() => this.props.navigation.navigate('카메라(인증사진 등록)', { completeFunc: this.updateCustomImgUri })}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#848484' }}>카메라</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.registerBtn}
                      onPress={() => this.props.navigation.navigate('갤러리 선택(인증사진 등록)', { completeFunc: this.updateCustomImgUri })}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#848484' }}>갤러리</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )  
            }
            <View style={styles.lineDivider} />
            <View style={styles.rulePickContainer}>
              <Text style={{
                fontWeight: 'bold', fontSize: 20, alignSelf: 'flex-start', marginLeft: 10, 
              }}>
                인증 룰 입력
              </Text>
              <View style={styles.ruleLineContainer}>
                <Text style={{ marginLeft: 10 }}>메인 룰: </Text>
                <TextInput
                  value={mainRule}
                  onChangeText={(rule) => this.setState({ mainRule: rule })}
                  style={styles.mainRuleInput}
                  placeholder="Sub Rule을 포함하는 메인룰을 작성해 주세요"
                />
              </View>
              <View style={styles.ruleLineContainer}>
                <Text style={{ marginLeft: 10 }}>서브 룰1: </Text>
                <TextInput
                  value={subRule1}
                  onChangeText={(rule) => this.setState({ subRule1: rule })}
                  style={styles.subRuleInput}
                  placeholder="Sub Rule1을 작성해 주세요"
                />
              </View>
              <View style={styles.ruleLineContainer}>
                <Text style={{ marginLeft: 10 }}>서브 룰2: </Text>
                <TextInput
                  value={subRule2}
                  onChangeText={(rule) => this.setState({ subRule2: rule })}
                  style={styles.subRuleInput}
                  placeholder="Sub Rule2를 작성해 주세요"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.nextStepBtn}
            onPress={() => this.props.navigation.navigate('플랜 만들기: 2단계', {
              category: this.props.route.params.category,
              planName: this.state.planTitle,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              certifyTime: this.state.certifyTime,
              picture_rule_1: null,
              picture_rule_2: null,
              picture_rule_3: null,
              custom_picture_rule_1: this.state.mainRule,
              custom_picture_rule_2: this.state.subRule1,
              custom_picture_rule_3: this.state.subRule2,
              certifyImgUri: this.state.customImgUri,
              userID: this.props.route.params.userID,
              categoryUri: this.props.route.params.uri,
              is_custom: true,
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
    height: height * 0.35,
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
    marginTop: 65,
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
  input: {
    width: 180,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
  },
  registerBtn: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#FFC0B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
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
  mainRuleInput: {
    width: width - 50,
    marginLeft: 5,
    height: 35,
    paddingLeft: 20,
  },
  subRuleInput: {
    width: width - 50,
    marginLeft: 5,
    height: 35,
    paddingLeft: 20,
  },
  ruleLineContainer: {
    width: width - 20,
    height: 40,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});