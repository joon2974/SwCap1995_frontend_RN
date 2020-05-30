import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import RecommendList from './TabList/RecommendList';
import AllCateList from './TabList/AllCateList';

const { height, width } = Dimensions.get('window');

const recommendListTemplate = {
  '10대': ['대학 입시', '학교 폭력', '게임', '친구들과 놀기'],
  '20대': ['대학 진로', '인간관계', '연애', '취업'],
  '30대': ['이직', '건강', '결혼', '효도'],
  '40~50대': ['건강 걱정', '갱년기 걱정', '노후 걱정', '자식 걱정'],
  '60대 이상': [
    '삶과 죽음 그 어딘가',
    '사랑하기 딱 좋은 나이',
    '환갑 축하문',
    '손자손녀 건강',
  ],
};

const allCateListTemplate = {
  '운동/건강': ['조깅', '흡연', '다이어트', '헬스'],
  생활습관: ['아침 기상', '식습관', '공부습관', '말투'],
  자기계발: ['어학', '상식', '예술', '인성'],
  감정관리: ['우울', '조울', '인내', '충동'],
  기타: ['표준어 사용', '과속 딱지 안 걸리기', '악플 안달기', '가족 챙기기'],
};

export default class Searchscreen extends Component {
  state = {
    search: '',
    selectedRecommend: '',
    selectedAllCate: '',

    nowRecommendList: ['1', '2', '3', '4'],
    nowAllCateList: ['1', '2', '3', '4'],

    nowRecommendUri: ['1', '2', '3', '4'],
    nowAllCateUri: ['1', '2', '3', '4'],
  };

  updateSearch = (changedSearch) => {
    this.setState({ search: changedSearch });
  };

  async sendSearch() {
    await axios
      .get('http://49.50.172.58:3000/graphql?query={categoryGet{id,image_url}}')
      .then((res) => {
        //        alert(res);
      })
      .catch((error) => {
        console.log(error);
        //        alert(error);
      });

    this.props.navigation.navigate('PlanSearched');
  }

  componentDidMount() {
    this.setPlanList('10대');
    this.setPlanListAllCate('운동/건강');
  }

  setPlanList = (categoryName) => {
    this.setState({ selectedRecommend: categoryName });

    const planList = recommendListTemplate[categoryName];
    this.setState({ nowRecommendList: planList });

    axios
      .get('http://49.50.172.58:3000/graphql?query={categoryGet{id,image_url}}')
      .then((res) => {
        this.setState({ nowRecommendUri: res.data.data.categoryGet });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  setPlanListAllCate = (categoryName) => {
    this.setState({ selectedAllCate: categoryName });

    const planListAllCate = allCateListTemplate[categoryName];
    this.setState({ nowAllCateList: planListAllCate });

    axios
      .get('http://49.50.172.58:3000/graphql?query={categoryGet{id,image_url}}')
      .then((res) => {
        this.setState({ nowAllCateUri: res.data.data.categoryGet });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  render() {
    const {
      selectedRecommend,
      selectedAllCate,
      nowRecommendList,
      nowAllCateList,
      nowRecommendUri,
      nowAllCateUri,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchTitle}>
            관심 있는 키워드를 아래에 입력해 보세요
          </Text>

          <View style={styles.searchBar}>
            <Input
              placeholder="Type Here..."
              onChangeText={(changedSearch) => {
                this.updateSearch(changedSearch);
              }}
            />
            <Button
              title="검색"
              type="solid"
              onPress={() => {
                this.sendSearch();
              }}
            />
          </View>
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View>
            <Text style={styles.recommendTitle}>주간 인기 플랜</Text>
            <Text style={styles.recommendSubTitle}>
              이 주의 가장 인기있는 플랜들을 확인해 보세요!!
            </Text>
          </View>

          <View style={styles.tabButtonContainer}>
            <TouchableOpacity
              style={
                selectedRecommend === '10대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('10대')}
            >
              <Text style={selectedRecommend === '10대' ? { color: 'white' } : { color: 'black' }}>10대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '20대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('20대')}
            >
              <Text style={selectedRecommend === '20대' ? { color: 'white' } : { color: 'black' }}>20대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '30대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('30대')}
            >
              <Text style={selectedRecommend === '30대' ? { color: 'white' } : { color: 'black' }}>30대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '40~50대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('40~50대')}
            >
              <Text style={selectedRecommend === '40~50대' ? { color: 'white' } : { color: 'black' }}>40~50대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '60대 이상'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('60대 이상')}
            >
              <Text style={selectedRecommend === '60대 이상' ? { color: 'white' } : { color: 'black' }}>60대 이상</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.planContainer}>
            {nowRecommendList.map((data, index) => (
              <RecommendList
                key={data}
                name={data}
                index={index}
                imageUri={nowRecommendUri}
                explore={() => this.props.navigation.navigate('DetailPlan')}
              />
            ))}
          </View>

          <View style={{ wdith: width * 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.moreExplore}
              onPress={() => this.props.navigation.navigate('HotPlan')}
            >
              <Text>인기플랜 더보기</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.allCateTitle}>전체 카테고리</Text>
            <Text style={styles.allCateSubTitle}>
              관심 있는 분야를 선택해 보세요!!
            </Text>
          </View>

          <View style={styles.tabButtonContainer}>
            <TouchableOpacity
              style={
                selectedAllCate === '운동/건강'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('운동/건강')}
            >
              <Text style={selectedAllCate === '운동/건강' ? { color: 'white' } : { color: 'black' }}>운동/건강</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '생활습관'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('생활습관')}
            >
              <Text style={selectedAllCate === '생활습관' ? { color: 'white' } : { color: 'black' }}>생활습관</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '자기계발'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('자기계발')}
            >
              <Text style={selectedAllCate === '자기계발' ? { color: 'white' } : { color: 'black' }}>자기계발</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '감정관리'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('감정관리')}
            >
              <Text style={selectedAllCate === '감정관리' ? { color: 'white' } : { color: 'black' }}>감정관리</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '기타'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('기타')}
            >
              <Text style={selectedAllCate === '기타' ? { color: 'white' } : { color: 'black' }}>기타</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.planContainer}>
            {nowAllCateList.map((data, index) => (
              <AllCateList
                key={data}
                name={data}
                index={index}
                imageUri={nowAllCateUri}
                explore={() => this.props.navigation.navigate('PlanSearched')}
              />
            ))}
          </View>

          <View style={{ wdith: width * 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.moreExplore}
              onPress={() => this.props.navigation.navigate('CategoryList')}
            >
              <Text>카테고리 더보기</Text>
            </TouchableOpacity>
          </View>

          <View style={{ paddingVertical: 20 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  searchContainer: {
    width: width * 0.95,
  },
  searchTitle: {
    marginLeft: 10,
    marginTop: 5,
  },
  searchBar: {
    width: width * 0.84,
    flexDirection: 'row',
    marginTop: 5,
  },
  scrollContainer: {
    width: width * 1,
  },
  recommendTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 25,
    fontSize: 24,
  },
  recommendSubTitle: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 16,
  },
  moreExplore: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.75,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    height: height * 0.04,
  },
  allCateTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 65,
    fontSize: 24,
  },
  allCateSubTitle: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 16,
  },

  tabButtonContainer: {
    width: width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  planContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
    backgroundColor: '#FD8A69',
    borderRadius: 5,
    margin: 1,
  },
});

/* 

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
const plansListTemp = {
  '운동/건강': [
    '헬스',
    '런닝',
    '푸시업',
    '기타 등등',
  ],
  '감정관리': [
    '하루 한 번 웃기',
    '하루 한 번 하늘 보기',
    'a',
    'b',
  ],
  '생활습관': [
    '하루 물 한컵 마시기',
    'q',
    'w',
    'e',
  ],
  '자기계발': [
    '아침 10시 일어나기',
    '아침 9시 일어나기',
    '12시 전 자기',
    '스마트폰 이용 줄이기',
  ],
  '기타': [
    '그 외 기타 등등',
  ],
};

export default class PlanMain extends Component {
  state = {
    isFaceRegisterd: false,
    selectedCategory: '운동',
    nowPlanList: ['test', 'data', 'hello', 'world'],
  } 

  componentDidMount() {
    this.loadUserID();
    this.setPlanList('운동/건강');
  }

  componentWillUnmount() {
    clearTimeout(isRegisterdCheck);
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID')
      .then((id) => { 
        this.isFaceRegisterdCheck(id);
      }); 
  }

  isFaceRegisterdCheck = (ID) => {
    console.log('asdfasdfasdf', ID);
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
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  registerComplete = () => {
    this.setState({ isFaceRegisterd: true });
  }

  // Test
  testTurnBack = () => {
    this.setState({ isFaceRegisterd: false });
  }

  setPlanList = (categoryName) => {
    this.setState({ selectedCategory: categoryName });
    const planList = plansListTemp[categoryName];
    console.log(planList);
    this.setState({ nowPlanList: planList });
  }

  planSelected = (planName) => {
    this.props.navigation.navigate('MakePlanStep1', { planName: planName });
  }

  render() {
    const { isFaceRegisterd, selectedCategory, nowPlanList } = this.state;

    if (isFaceRegisterd) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.testContainer}>
              <Text>플랜 메인</Text>
              <Button title="플랜 생성" onPress={() => this.props.navigation.navigate('MakePlanStep1')} />
              <Button title="테스트 전환" onPress={() => this.testTurnBack()} />
            </View>

            <View style={styles.selectionContainer}>
              <View style={styles.categoryBtnContainer}>
                <TouchableOpacity
                  style={selectedCategory === '운동/건강' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('운동/건강')}
                >
                  <Text>운동/건강</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '감정관리' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('감정관리')}
                >
                  <Text>감정관리</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '생활습관' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('생활습관')}
                >
                  <Text>생활습관</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '자기계발' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('자기계발')}
                >
                  <Text>자기계발</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={selectedCategory === '기타' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
                  onPress={() => this.setPlanList('기타')}
                >
                  <Text>기타</Text>
                </TouchableOpacity>
                
              </View>
              <View style={styles.plansContainer}>
                {nowPlanList.map((data) => (
                  <PlanListEach
                    key={data}
                    name={data}
                    planSelectFunc={() => this.planSelected(data)}
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
              onPress={() => this.props.navigation.navigate('CameraScreen', { completeFunc: this.registerComplete.bind(this) })}
            >
              <Text>카메라로 사진 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={() => this.props.navigation.navigate('ImagePickScreen', { completeFunc: this.registerComplete.bind(this) })}
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
*/
