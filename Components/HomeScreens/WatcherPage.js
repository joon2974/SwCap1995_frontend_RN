/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import axios from 'axios';
import { ProgressChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';
import VariableCard from './VariableCard';
import { CardNine2, CardNine3 } from '../SearchScreens/Cards';
import PointHistory from '../SearchScreens/TabList/PointHistory';
import Watcher from '../SearchScreens/TabList/Watcher';

const { width, height } = Dimensions.get('window');

const categoryURI = [
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%83%E1%85%A9%E1%86%BC.jpg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%89%E1%85%A2%E1%86%BC%E1%84%92%E1%85%AA%E1%86%AF%E1%84%89%E1%85%B3%E1%86%B8%E1%84%80%E1%85%AA%E1%86%AB.jpg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%8C%E1%85%A1%E1%84%80%E1%85%B5%E1%84%80%E1%85%A8%E1%84%87%E1%85%A1%E1%86%AF.jpeg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%80%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5.jpeg',
  'https://kr.object.ncloudstorage.com/swcap1995/category_images/%E1%84%80%E1%85%B5%E1%84%90%E1%85%A1.jpeg',
];


export default class WatcherPage extends Component {
  state = {
    onOff: 0,
    selectedTab: 0,
    tabState: 0,
    testArray: [],
    testArray2: [],
    dateConverted: '',

    titleURI: 'https://kr.object.ncloudstorage.com/swcap1995/plans/noimg.png',
    isModalVisible: 0,
    keysPointAndCount: [],
    pointAndCount: [],
    distributedPoint: 0,
    rejectCount: 0,
    pointHistory2: [],
    authCount: 0,
  }

  async componentDidMount() {
    await this.setTest();
    this.setTab();
  }

  setTab = () => {
    this.setState({
      tabState: this.props.route.params.selectedTab, 
      selectedTab: this.props.route.params.selectedTab, 
    });
  }

  setPoint =() => {
    this.setState({ 
      distributedPoint: 
      (this.state.testArray2.bet_money * this.state.testArray2.percent) / 100, 
    });
  }

  toggleModal=() => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  setTitle = () => {
    if (this.state.testArray2.category === '운동/건강') this.setState({ titleURI: categoryURI[0] });
    else if (this.state.testArray2.category === '생활습관') this.setState({ titleURI: categoryURI[1] });
    else if (this.state.testArray2.category === '자기계발') this.setState({ titleURI: categoryURI[2] });
    else if (this.state.testArray2.category === '감정관리') this.setState({ titleURI: categoryURI[3] });
    else if (this.state.testArray2.category === '기타') this.setState({ titleURI: categoryURI[4] });
  }


  setTest = () => {
    axios.get('http://49.50.172.58:3000/daily_authentications/' + this.props.route.params.planID).then((res) => {
      this.setState({
        testArray: res.data.rows,
        rejectCount: res.data.reject_count, 
        authCount: res.data.count,
      });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
    axios.get('http://49.50.172.58:3000/plans/' + this.props.route.params.planID).then((res) => {
      this.setState({ testArray2: res.data });
      
      this.setTest2(res.data.id);
      
      this.setTitle();
      
      this.setPoint();
  
      const dateParsing1 = res.data.plan_start_day.split('-');
      let dateParsing2 = '';
      dateParsing2 = dateParsing2.concat(dateParsing1[0] + '년 ' + dateParsing1[1] + '월 ' + dateParsing1[2][0] + dateParsing1[2][1] + '일');
      this.setState({ dateConverted: dateParsing2 });
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }  

  setTest2 = (id) => {
    axios.get('http://49.50.172.58:3000/plans/watch_achievement/' + id).then((res) => {
      this.setState({
        pointAndCount: res.data, 
        pointHistory2: res.data[this.props.route.params.userID].point, 
      }); 
      for (const key in this.state.pointAndCount) {
        this.setState({ keysPointAndCount: this.state.keysPointAndCount.concat(key) });  
      }
      // this.state.keysPointAndCount.map(data => {console.log(this.state.pointAndCount[data])});
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  render() {
    const watcherData = {
      labels: ['빵준이', '한수찬', '김첨지'], // optional
      data: [0.95, 0.30, 0.66],
    };

    // if(Object.keys(this.state.pointAndCount).length !== 0){
    //   console.log(this.state.pointAndCount[77].count);
    // }

    
    const chartConfig = {
      backgroundGradientFrom: '#139C73',
      backgroundGradientTo: 'white',
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(19, 156, 115, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };
   

    let coinInfo = null;
    if (Object.keys(this.state.pointAndCount).length !== 0) {
      coinInfo = (

        <View style={styles.getPointContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>획득 포인트</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17, marginLeft: 10 }}>실패 횟수:  </Text>
            <Text>{this.state.rejectCount}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17, marginLeft: 10 }}>차감될 포인트:  </Text>
            <Text>{this.state.distributedPoint}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17, marginLeft: 10 }}>내가 획득한 포인트:  </Text>
            <Text>
              {this.state.pointAndCount[this.props.route.params.userID].point_sum}
              {' '}
              💸
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트 내역</Text>
          </View>
        </View>                        
      );      
    }
      
    let coinThumbnail = null;
    if (Object.keys(this.state.pointAndCount).length !== 0) {
      coinThumbnail = (
        
        <TouchableOpacity
          style={{ 
            height: height / 4, 
            width: width / 1.2,
            marginTop: 30, 
            borderColor: 'black',
            borderRadius: 20,
            borderWidth: 4,
            alignItems: 'center',
            flexDirection: 'row',  
          }}
          onPress={() => this.toggleModal()}
        >
          <Image
            style={{
              height: height / 6,
              width: height / 6,
              marginLeft: 10,
              resizeMode: 'stretch',
            }}
            source={require('./money.png')}
          />
          <View style={{
            height: height / 6,
            width: height / 6,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
            <Text style={{ fontSize: 25 }}>
              획득 포인트
            </Text>
            <Text style={{ fontSize: 15 }}>
              {this.state.pointAndCount[this.props.route.params.userID].point_sum}
              {' '}
              p
            </Text>
          </View>
        </TouchableOpacity>

      );
    }

    let pointHistoryComponent = null;
    if (this.state.pointHistory2.length !== 0) {
      pointHistoryComponent = (
        <View>
          {
          this.state.pointHistory2.map((data, index) => (
            <View key={data}>
              <PointHistory
                key={data}
                index={index}
                data={data}
              />
            </View>
          ))                                
        }
        </View>  
      );
    } else {
      pointHistoryComponent = (
        <View />
      );
    }


    let watchersComponent = null;
    if (Object.keys(this.state.pointAndCount).length !== 0) {
      watchersComponent = (

        <View>
          {
          this.state.keysPointAndCount.map((data, index) => (
            <View key={data}>
              <Watcher 
                key={data}
                index={index}
                data={this.state.pointAndCount[data]}
                id={data}
              />
            </View>
          ))                                
        }
        </View>
      );
    }

    return (

      <View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={
            this.state.selectedTab === 0
              ? styles.selectedCategoryBtnStyle
              : styles.categoryBtnStyle
        }
            onPress={() => this.setState({ selectedTab: 0, tabState: 0 })}
      >
            <Text style={this.state.selectedTab === 0 ? { color: 'white' } : { color: 'black' }}>감시</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
          this.state.selectedTab === 1
            ? styles.selectedCategoryBtnStyle
            : styles.categoryBtnStyle
        }
            onPress={() => this.setState({ selectedTab: 1, tabState: 1 })}
      >
            <Text style={this.state.selectedTab === 1 ? { color: 'white' } : { color: 'black' }}>정보</Text>
          </TouchableOpacity>
        </View>
        
        {this.state.tabState === 0 ? (

          <ScrollView style={{ marginBottom: 40 }}>
          

            <View style={styles.container}>
              {
                this.state.testArray.map((data, index) => (
                  <VariableCard 
                    key={data.id}
                    data={data}
                    data2={this.state.testArray2}
                    index={index} 
                    onOff={this.state.onOff}
                    changeShowing={() => {
                      this.setState({ onOff: index });
                    }}
                    planData={this.state.testArray2}
                    userID={this.props.route.params.userID}
                />
                ))
              }
              <View style={styles.lineDivider} />

            </View>

          </ScrollView>
        ) : (


          <ScrollView contentContainerStyle={styles.scrollViewStyle} style={{ marginBottom: 40 }}>
       
            <CardNine3
              title={this.state.testArray2.title}
              subTitle={this.state.testArray2.category} 
              description={this.state.testArray2.custom_picture_rule_3} // description => subtitle 
              image={{ uri: this.state.titleURI }}
              exploreMoreInfo={() => this.props.navigation.navigate('플랜 상세 정보', { item: this.state.testArray2 })}
          />
  
            <View style={styles.lineDivider} />
  
            <View style={styles.timeContainer}>
              <View style={styles.componentTitleContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>날짜 / 시간</Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={{ fontWeight: '800', fontSize: 15 }}>시작 날짜:  </Text>
                <Text>
                  {this.state.dateConverted}
                </Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={{ fontWeight: '800', fontSize: 15 }}>플랜 기간:  </Text>
                <Text>
                  {this.state.testArray2.plan_period}
                  {' '}
                  주
                </Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={{ fontWeight: '800', fontSize: 15 }}>인증 시간:  </Text>
                <Text>
                  {this.state.testArray2.picture_time}
                  {' '}
                  시(앞 뒤로 30분의 여유 시간이 주어집니다)
                </Text>
              </View>
            </View>
  
            <View style={styles.lineDivider} />
  
            <CardNine2
              title="인증 룰"
              subTitle={'\n' + this.state.testArray2.picture_rule_1 
              + '\n' + this.state.testArray2.picture_rule_2 
              + '\n' + this.state.testArray2.picture_rule_3}
              image={{ uri: this.state.testArray2.image_url }} />
  
  
            <View style={styles.lineDivider} />
  
            <View style={styles.pointContainer}>
              <View style={styles.componentTitleContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트</Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={{ fontWeight: '800', fontSize: 17 }}>도전 포인트:  </Text>
                <Text>{this.state.testArray2.bet_money}</Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={{ fontWeight: '800', fontSize: 17 }}>차감 %:  </Text>
                <Text>{this.state.testArray2.percent}</Text>
              </View>
              <View style={styles.lineContainer}>
                <Text style={{ fontWeight: '800', fontSize: 17 }}>분배 방식:  </Text>
                <Text>{this.state.testArray2.distrib_method}</Text>
              </View>
            </View>
  
            <View>
              {coinThumbnail}
            </View>
  
            <View style={styles.lineDivider} />
  
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
              <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', justifyContent: 'center' }} onBackButtonPress={this.toggleModal}>
  
                <ScrollView style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  borderWidth: 5,
                  borderColor: '#fd8a69',
                }}>
  
                  <View>
                    {coinInfo}  
                  </View>            
  

                  <View>
                    {pointHistoryComponent}
                  </View>
  
                  <TouchableOpacity
                    style={{
                      width: width * 0.77,
                      height: height / 12,
                    }}
                    onPress={this.toggleModal} />
  
                  <View style={{ marginBottom: 10 }} />
                
                </ScrollView>
  
              </Modal>
            </TouchableWithoutFeedback>
  
  
            <View style={styles.lineDivider} />
  
            <ProgressChart
              data={watcherData}
              width={width * 0.9}
              height={height / 4}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={false}
          />
  
            <View style={styles.titleInfoContainer}>
              <Text style={styles.titleStyle}>
                감시자들
              </Text>
                          
              <View>
                {watchersComponent}
              </View>
  
              <View style={{ marginBottom: 10 }} />
            </View>
  
            <View style={styles.lineDivider} />
  
          </ScrollView>
        ) }
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
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
  getPointContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    marginVertical: 20,
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
  titleInfoContainer: {
    borderWidth: 4,
    borderColor: '#139C73',
    backgroundColor: 'white',
    width: width * 0.9,
    marginTop: 15,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    // eslint-disable-next-line no-undef
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
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  categoryBtnStyle: {
    width: width * 0.495,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 1,
  },

  selectedCategoryBtnStyle: {
    width: width * 0.495,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD8A69',
    borderRadius: 5,
    margin: 1,
  },
 
});
