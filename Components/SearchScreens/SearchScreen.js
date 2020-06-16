/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import RecommendList from './TabList/RecommendList';
import AllCateList from './TabList/AllCateList';

const { height, width } = Dimensions.get('window');

export default class Searchscreen extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      selectedRecommend: '',
      selectedAllCate: '',
      nowRecommend: [],
      nowAllCate: [],
      refreshing: false,
    };
  }
  
  componentDidMount() {
    this.setPlanList('10대');
    this.setPlanListAllCate('운동/건강');
  }

  onRefresh = () => {
    this.setState({
      selectedRecommend: '',
      selectedAllCate: '',
      nowRecommend: [],
      nowAllCate: [],
    });
    this.setState({ refreshing: true });
    this.setPlanList('10대')
      .then(this.setPlanListAllCate('운동/건강'))
      .then(() => this.setState({ refreshing: false }));
  }

  setPlanList = async (categoryName) => {
    this.setState({ selectedRecommend: categoryName });

    axios.get('http://49.50.172.58:3000/plans?limit=4&page=1').then((res) => {
      this.setState({ nowRecommend: res.data.plans });
    
    //      this.setState({ nowRecommendUri: res.data.data.categorcyGet });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  setPlanListAllCate = (categoryName) => {
    this.setState({ selectedAllCate: categoryName });

    axios.get('http://49.50.172.58:3000/plans?limit=4&page=1').then((res) => {
      this.setState({ nowAllCate: res.data.plans });
    
    //      this.setState({ nowRecommendUri: res.data.data.categorcyGet });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  render() {
    const {
      selectedRecommend,
      selectedAllCate,
    } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => this.props.navigation.navigate('검색하기')}
            >
            <FontAwesome name="search" size={20} style={{ marginLeft: 15 }} />
            <Text style={styles.searchTitle}>
              입력해주세요
            </Text>
          </TouchableOpacity>
            
        </View>

        <ScrollView 
          refreshControl={(
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="white" />
          )}
          style={styles.scrollContainer}
        >
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
            {this.state.nowRecommend.map((item, index) => (
              <RecommendList
                key={index}
                index={index}
                item={item}
                explore={() => this.props.navigation.navigate('플랜 상세 정보', { item: item })}
              />
            ))}
          </View>

          <View style={{ wdith: width * 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.moreExplore}
              onPress={() => this.props.navigation.navigate('인기 플랜', { selectedRecommend: selectedRecommend })}
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
            {this.state.nowAllCate.map((item, index) => (
              <AllCateList
                key={index}
                index={index}
                item={item}
                explore={() => this.props.navigation.navigate('플랜 목록', { selectedAllCate: selectedAllCate })}
              />
            ))}
          </View>

          <View style={{ wdith: width * 1, alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.moreExplore}
              onPress={() => this.props.navigation.navigate('카테고리', { selectedAllCate: selectedAllCate })}
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
    alignItems: 'center',
    width: width * 0.95,
  },
  searchTitle: {
    marginLeft: 10,
  },
  searchBar: {
    width: width * 0.9,
    height: height * 0.05,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    marginTop: 5,
    marginBottom: 10,
  },
  scrollContainer: {
    width: width * 1,
  },
  recommendTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 15,
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
