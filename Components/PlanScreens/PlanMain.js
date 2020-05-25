import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import PlanListEach from './PlanComponents/PlanListEach';

let isRegisterdCheck;
const { height, width } = Dimensions.get('window');

export default class PlanMain extends Component {
  state = {
    userID: null,
    isFaceRegisterd: false,
    selectedCategory: '운동/건강',
    nowPlanList: ['헬스', '식단', '런닝', '푸시업', '기타'],
    planListFromServer: null,
  } 

  componentDidMount() {
    this.loadUserID();
    this.loadPlansFromServer();
  }

  componentWillUnmount() {
    clearTimeout(isRegisterdCheck);
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID')
      .then((id) => { 
        this.isFaceRegisterdCheck(id);
        this.setState({ userID: id });
      }); 
  }

  loadPlansFromServer = async () => {
    await axios.get('http://49.50.172.58:3000/detailedCategories').then((data) => {
      const plansFromServer = data.data.data.detailedCategoryGet;
      const planObject = {};

      planObject['운동/건강'] = this.planFilter(plansFromServer, 1);
      planObject['감정관리'] = this.planFilter(plansFromServer, 4);
      planObject['생활습관'] = this.planFilter(plansFromServer, 2);
      planObject['자기계발'] = this.planFilter(plansFromServer, 3);
      planObject['기타'] = this.planFilter(plansFromServer, 5);

      this.setState({ planListFromServer: planObject });
      console.log('서버로부터 받아온 plan 목록: ', this.state.planListFromServer);
    })
      .catch((error) => {
        console.log('서버로부터 plans 가져오기 에러: ', error);
      });
  }

  planFilter = (plansList, categoryNum) => {
    const categoryPlans = plansList.filter((plan) => plan.topCategoryNum === categoryNum);
    const categoryPlansName = categoryPlans.map((plan) => plan.detailedCategory);

    return categoryPlansName;
  }

  isFaceRegisterdCheck = (ID) => {
    isRegisterdCheck = axios
      .get('http://49.50.172.58:3000/users/is_face_detection/' + ID, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        if (res === true) {
          console.log('얼굴인식 완료된 유저');
          this.setState({ isFaceRegisterd: true });
          this.forceUpdate();
        } else {
          console.log('얼굴인식 결과: ', res.data);
        }
      })
      .catch((error) => {
        console.log('얼굴인증 확인 실패', error);
      });
  }

  registerComplete = () => {
    this.setState({ isFaceRegisterd: true });
  }

  // Test
  testTurnBack = () => {
    this.setState({ isFaceRegisterd: false });
  }

  setPlanList = (categoryName, planListFromServer) => {
    this.setState({ selectedCategory: categoryName });
    const planList = planListFromServer[categoryName];
    this.setState({ nowPlanList: planList });
  }

  planSelected = (planName, selectedCategory) => {
    this.props.navigation.navigate('MakePlanStep1', { planName: planName, category: selectedCategory });
  }

  render() {
    const {
      isFaceRegisterd,
      selectedCategory,
      nowPlanList,
      planListFromServer,
      userID,
    } = this.state;

    if (isFaceRegisterd) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.testContainer}>
              <Text>플랜 메인</Text>
              <Button title="테스트 전환" onPress={() => this.testTurnBack()} />
            </View>

            <View style={styles.selectionContainer}>
              <View style={styles.categoryBtnContainer}>
                <TouchableOpacity
                  style={selectedCategory === '운동/건강' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('운동/건강', planListFromServer)}
                >
                  <Text>운동/건강</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '감정관리' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('감정관리', planListFromServer)}
                >
                  <Text>감정관리</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '생활습관' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('생활습관', planListFromServer)}
                >
                  <Text>생활습관</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '자기계발' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('자기계발', planListFromServer)}
                >
                  <Text>자기계발</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '기타' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('기타', planListFromServer)}
                >
                  <Text>기타</Text>
                </TouchableOpacity>
                
              </View>
              <View style={styles.plansContainer}>
                {nowPlanList.map((data) => (
                  <PlanListEach
                    key={data}
                    name={data}
                    planSelectFunc={() => this.planSelected(data, selectedCategory)}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.InfoContainer}>
            <View style={styles.informTitle}>
              <Text style={{ fontWeight: 'bold', fontSize: 30 }}>얼굴 인증</Text>
            </View>
            <View style={styles.information}>
              <Text>Plan A는 사용자의 대리 인증을 방지하기 위해 본인 인증을 위한 수단으로 얼굴 인증을 사용하고 있습니다.</Text>
              <Text>하단의 두 방법 중 하나의 방법으로 자신의 얼굴을 Plan A에 등록해 주세요.</Text>
            </View>
            <Button 
              title="테스트 전환"
              onPress={() => this.registerComplete()}
            />
          </View>
          <View style={styles.BtnContainer}>
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={() => this.props.navigation.navigate('CameraScreen', { completeFunc: this.registerComplete.bind(this), userID: userID })}
            >
              <Text>카메라로 사진 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={() => this.props.navigation.navigate('ImagePickScreen', { completeFunc: this.registerComplete.bind(this), userID: userID })}
            >
              <Text>갤러리에서 사진 가져오기</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testContainer: {
    width: width,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectionContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  InfoContainer: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
  },
  categoryBtnContainer: {
    width: width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryBtnStyle: {
    width: width * 0.17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 1,
  },
  selectedCategoryBtnStyle: {
    width: width * 0.17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    margin: 1,
  },
  plansContainer: {
    width: width,
    height: height - 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  BtnContainer: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  informTitle: {
    height: height / 4,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  information: {
    height: height / 4,
    width: width - 30,
    justifyContent: 'center',
    marginLeft: 15,
  },
  registerBtn: {
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
