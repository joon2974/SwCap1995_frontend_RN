import React, {Component} from 'react';
import {
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  Button} from 'react-native';
import { Input } from 'react-native-elements';
import axios from 'axios';
import PlanListEach from './PlanListEach/PlanListEach';
import PlanListEachAllCate from './PlanListEach/PlanListEachAllCate';

const { height, width } = Dimensions.get('window');

const plansListTemplate = {
  '10대': [
    '대학 입시',
    '학교 폭력',
    '게임',
    '친구들과 놀기',
  ],
  '20대': [
    '대학 진로',
    '인간관계',
    '연애',
    '취업',
  ],
  '30대': [
    '이직',
    '건강',
    '결혼',
    '효도',
  ],
  '40~50대': [
    '건강 걱정',
    '갱년기 걱정',
    '노후 걱정',
    '자식 걱정',
  ],
  '60대 이상': [
    '삶과 죽음 그 어딘가',
    '사랑하기 딱 좋은 나이',
    '환갑 축하문',
    '손자손녀 건강',
  ],
};

const plansListAllCateTemplate = {
  '운동/건강' :[
    '조깅',
    '흡연',
    '다이어트',
    '헬스',
  ],
  '생활습관':[
    '아침 기상',
    '식습관',
    '공부습관',
    '말투',
  ],
  '자기계발':[
    '어학',
    '상식',
    '예술',
    '인성',
  ],
  '감정관리':[
    '우울',
    '조울',
    '인내',
    '충동',
  ],
  '기타':[
    '표준어 사용',
    '과속 딱지 안 걸리기',
    '악플 안달기',
    '가족 챙기기',
  ]

}

export default class Searchscreen extends Component {

  state = {
    search: '',
    uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    selectedCategory : '',
    nowPlanList: ['test', 'data', 'hello', 'world'],
    nowPlanListAllCate: ['test', 'data', 'hello', 'world'],
  };


  updateSearch = (changedSearch)=> {
    this.setState({ search : changedSearch }); 
  }

  //graphql?query={categoryGet{id,name,image_url}}
  async sendSearch(){
      await axios.get('http://49.50.172.58:3000/graphql?query={categoryGet{id,name,description,image_url}}').then(res => {
        console.log(res);
        alert(res.data);
      }).catch(error => {
        console.log(error);
        alert(error);
      });

      this.setState({uri:'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'});
  }

  componentDidMount() {
    this.setPlanList('10대');
    this.setPlanListAllCate('생활습관');
  }

  setPlanList = (categoryName) => {
    this.setState({ selectedCategory: categoryName });

    const planList = plansListTemplate[categoryName];
    this.setState({ nowPlanList: planList });
    
  }

  setPlanListAllCate = (categoryName) =>{
    this.setState({selectedCategoryAllCate : categoryName});

    const planListAllCate = plansListAllCateTemplate[categoryName];
    this.setState({nowPlanListAllCate:planListAllCate});
  }

  render(){

    const { selectedCategory, selectedCategoryAllCate, nowPlanList, nowPlanListAllCate} = this.state;

    return (

      <View style = {styles.container}>
        
        <View>
          <Text style = {styles.searchTitle}>
            관심 있는 키워드를 아래에 입력해 보세요
          </Text>
        </View>

        <View style = {styles.searchBar}>
          <Input
            placeholder="Type Here..."
            onChangeText={(changedSearch) => {this.updateSearch(changedSearch)}}
          />  
          <Button
            title="검색"
            type="solid"
            onPress={() => {this.sendSearch()}}
          />
        </View>

        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }} 
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}
        >

          <View>
            <Text style = {styles.recommendTitle}>
              주간 인기 분야
            </Text>
            <Text style = {styles.recommendSubTitle}>
              이 주의 가장 인기있는 플랜들을 확인해 보세요!!
            </Text>
          </View>

 

          <View style={styles.tabRecommended}>
            <TouchableOpacity
              style={selectedCategory === '10대' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanList('10대')}
            >
              <Text>10대</Text>
            </TouchableOpacity>     

            <TouchableOpacity
              style={selectedCategory === '20대' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanList('20대')}
            >
              <Text>20대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedCategory === '30대' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanList('30대')}
            >
              <Text>30대</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={selectedCategory === '40~50대' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanList('40~50대')}
            >
              <Text>40~50대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedCategory === '60대 이상' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanList('60대 이상')}
            >
              <Text>60대 이상</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.plansContainer}>
            {nowPlanList.map((data) => (
              <PlanListEach
                key={data}
                name={data}
                explore = {()=>  this.props.navigation.navigate('DetailPlan') }
              />
            ))}
          </View>

                                
         
          <View>
            <Text style = {styles.recommendTitle}>
              전체 카테고리
            </Text>
            <Text style = {styles.recommendSubTitle}>
              관심 있는 분야를 선택해 보세요!!
            </Text>
          </View>

          <View style={styles.tabRecommended}>
            <TouchableOpacity
              style={selectedCategoryAllCate === '운동/건강' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanListAllCate('운동/건강')}
            >
              <Text>운동/건강</Text>
            </TouchableOpacity>     

            <TouchableOpacity
              style={selectedCategoryAllCate === '생활습관' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanListAllCate('생활습관')}
            >
              <Text>생활습관</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedCategoryAllCate === '자기계발' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanListAllCate('자기계발')}
            >
              <Text>자기계발</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedCategoryAllCate === '감정관리' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanListAllCate('감정관리')}
            >
              <Text>감정관리</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={selectedCategoryAllCate === '기타' ? styles.selectedCategoryBtnStyle : styles.categoryBtnStyle}
              onPress={() => this.setPlanListAllCate('기타')}
            >
              <Text>기타</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.plansContainer}>
            {nowPlanListAllCate.map((data) => (
              <PlanListEachAllCate
                key={data}
                name={data}
                explore = {()=>  this.props.navigation.navigate('DetailPlan') }
              />
            ))}
          </View>

        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  searchTitle:{
    marginHorizontal: 10,
    marginTop : 5,
  },
  searchBar:{ 
    width: width * 0.87,
    flexDirection:'row',
    marginTop : 5, 
  },
  recommendTitle:{
    fontWeight: 'bold', 
    marginHorizontal:25, 
    marginTop:25,
    fontSize:24,
  },
  recommendSubTitle:{
    marginHorizontal:25, 
    marginTop: 10, 
    fontSize:16,
  },
  
  tabRecommended: {
    width: width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  
  plansContainer: {
    width: width,
    height: height * 0.58,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop:10,
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
    backgroundColor: '#00FFFF',
    borderRadius: 5,
    margin: 1,
  },
  
  
})

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

