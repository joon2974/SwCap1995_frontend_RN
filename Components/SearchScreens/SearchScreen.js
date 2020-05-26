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

export default class Searchscreen extends Component {
  state = {
    search: '',
    selectedRecommend: '',
    selectedAllCate: '',

    nowRecommendList: ['1', '2', '3', '4'],
    nowAllCateList: ['1', '2', '3', '4'],

    nowRecommendUri: ['1', '2', '3', '4'],
    nowAllCateUri: ['1', '2', '3', '4'],

    test:['1','2','3','4'],
    
  };

  updateSearch = changedSearch => {
    this.setState({ search: changedSearch });
  };

  async sendSearch() {
    await axios
      .get('http://49.50.172.58:3000/graphql?query={categoryGet{id,image_url}}')
      .then(res => {
        //        alert(res);
      })
      .catch(error => {
        console.log(error);
        //        alert(error);
      });

    this.props.navigation.navigate('PlanSearched');
  }

  componentDidMount() {
    this.setPlanList('10대');
    this.setPlanListAllCate('운동/건강');
  }

  setPlanList = categoryName => {
    this.setState({ selectedRecommend: categoryName });

    
    axios.get('http://49.50.172.58:3000/graphql?query={categoryGet{id,image_url}}').then(res=>{
      this.setState({nowRecommendUri:res.data.data.categoryGet});

    }).catch(error=>{
      console.log(error);
      alert(error);
    });


    axios.get('http://49.50.172.58:3000/detailedCategories/1').then(res=>{

      this.setState({nowRecommendList:res.data.rows});
    }).catch(error=>{
      console.log(error);
      alert(error);
    });

  }

  setPlanListAllCate = categoryName => {
    this.setState({ selectedAllCate: categoryName });

    // const planListAllCate = allCateListTemplate[categoryName];
    // this.setState({nowAllCateList:planListAllCate});
    
    axios.get('http://49.50.172.58:3000/graphql?query={categoryGet{id,image_url}}').then(res=>{
      this.setState({nowAllCateUri:res.data.data.categoryGet});

    }).catch(error=>{
      console.log(error);
      alert(error);
    });


    axios.get('http://49.50.172.58:3000/detailedCategories/1').then(res=>{

      this.setState({nowAllCateList:res.data.rows});
    }).catch(error=>{
      console.log(error);
      alert(error);
    });

  }

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
              onChangeText={changedSearch => {
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
              <Text>10대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '20대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('20대')}
            >
              <Text>20대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '30대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('30대')}
            >
              <Text>30대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '40~50대'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('40~50대')}
            >
              <Text>40~50대</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedRecommend === '60대 이상'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanList('60대 이상')}
            >
              <Text>60대 이상</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.planContainer}>
            {this.state.test.map((data,index) => (
              <RecommendList
                key={data}
                name={nowRecommendList}
                index = {index}
                imageUri = {nowRecommendUri}
                explore = {()=>  this.props.navigation.navigate('DetailPlan', {name : data})}
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
              <Text>운동/건강</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '생활습관'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('생활습관')}
            >
              <Text>생활습관</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '자기계발'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('자기계발')}
            >
              <Text>자기계발</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '감정관리'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('감정관리')}
            >
              <Text>감정관리</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                selectedAllCate === '기타'
                  ? styles.selectedCategoryBtnStyle
                  : styles.categoryBtnStyle
              }
              onPress={() => this.setPlanListAllCate('기타')}
            >
              <Text>기타</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.planContainer}>
            {this.state.test.map((data, index) => (
              <AllCateList
                key={data}
                name={nowAllCateList}
                index = {index}
                imageUri = {nowAllCateUri}
                explore = {()=>  this.props.navigation.navigate('PlanList')}
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
    backgroundColor: '#00FFFF',
    borderRadius: 5,
    margin: 1,
  },
});
