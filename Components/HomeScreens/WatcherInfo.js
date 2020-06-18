/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { ProgressChart } from 'react-native-chart-kit';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardNine3, CardNine2 } from '../SearchScreens/Cards';
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


export default class WatcherInfo extends Component {
  state = {
    testArray: [],
    titleURI: 'https://kr.object.ncloudstorage.com/swcap1995/plans/noimg.png',
    watchers: [1, 2, 3],
    watchersComment: ['빵준이', '한수찬', '김첨지'],
    // watchersComment: ['생각보다 열심히 하네', '웬일이지ㅋㅋㅋ', '500원 꺼억', '몸짱 되겠다!', '지석이 맞아?'],
    isModalVisible: 0,
    pointHistory: [500],
    pointDate: ['6월 1일'],
    dateConveted: '',
  }

  componentDidMount() {
    this.setTest();
  }

  toggleModal=() => {
    this.setState({ isModalVisible: !this.state.isModalVisible }); 
  }

  setTitle = () => {
    if (this.props.planData.category === '운동/건강') this.setState({ titleURI: categoryURI[0] });
    else if (this.props.planData.category === '생활습관') this.setState({ titleURI: categoryURI[1] });
    else if (this.props.planData.category === '자기계발') this.setState({ titleURI: categoryURI[2] });
    else if (this.props.planData.category === '감정관리') this.setState({ titleURI: categoryURI[3] });
    else if (this.props.planData.category === '기타') this.setState({ titleURI: categoryURI[4] });
  }

  setTest = () => {
    axios.get('http://49.50.172.58:3000/plans/' + this.props.planData.id).then((res) => {
      this.setState({ testArray: res.data });
      this.setTitle();
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

    const chartConfig = {
      backgroundGradientFrom: '139C73',
      backgroundGradientTo: 'white',
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(19, 156, 115, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };


    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle} style={{ marginBottom: 40 }}>
       
        <CardNine3
          title={this.props.planData.title}
          subTitle={this.props.planData.category} 
          description={this.props.planData.custom_picture_rule_3} // description => subtitle 
          image={{ uri: this.state.titleURI }}
          exploreMoreInfo={this.props.exploreMoreInfo}
        />

        <View style={styles.lineDivider} />

        <View style={styles.timeContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>날짜 / 시간</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>시작 날짜:  </Text>
            <Text>
              {this.props.date}
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>플랜 기간:  </Text>
            <Text>
              {this.props.planData.plan_period}
              {' '}
              주
            </Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>인증 시간:  </Text>
            <Text>
              {this.props.planData.picture_time}
              {' '}
              시(앞 뒤로 30분의 여유 시간이 주어집니다)
            </Text>
          </View>
        </View>

        <View style={styles.lineDivider} />

        <CardNine2
          title="인증 룰"
          subTitle={'\n' + this.props.planData.picture_rule_1 
            + '\n' + this.props.planData.picture_rule_2 
            + '\n' + this.props.planData.picture_rule_3}
          image={{ uri: this.props.planData.image_url }} />


        <View style={styles.lineDivider} />

        <View style={styles.pointContainer}>
          <View style={styles.componentTitleContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>도전 포인트:  </Text>
            <Text>{this.props.planData.bet_money}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>차감 %:  </Text>
            <Text>{this.props.planData.percent}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={{ fontWeight: '800', fontSize: 17 }}>분배 방식:  </Text>
            <Text>{this.props.planData.distrib_method}</Text>
          </View>
        </View>

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
              500 p
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.lineDivider} />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              
          <Modal isVisible={this.state.isModalVisible} style={{ alignItems: 'center', justifyContent: 'center' }} onBackButtonPress={this.toggleModal}>

            <ScrollView style={{
              backgroundColor: 'white',
              borderRadius: 20,
              borderWidth: 5,
              borderColor: '#fd8a69',
            }}>

            
              <View style={styles.getPointContainer}>
                <View style={styles.componentTitleContainer}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>획득 포인트</Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={{ fontWeight: '800', fontSize: 17, marginLeft: 10 }}>실패 횟수:  </Text>
                  <Text>1</Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={{ fontWeight: '800', fontSize: 17, marginLeft: 10 }}>차감될 포인트:  </Text>
                  <Text>500</Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={{ fontWeight: '800', fontSize: 17, marginLeft: 10 }}>내가 획득한 포인트:  </Text>
                  <Text>500 💸</Text>
                </View>
                <View style={styles.lineContainer}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>포인트 내역</Text>
                </View>
              </View>                        

              <View>
                {
                  this.state.pointHistory.map((data, index) => (
                    <View key={data}>
                      <PointHistory
                        key={data}
                        index={index}
                        point={data}
                        date={this.state.pointDate}
                      />
                    </View>
                  ))                                
                }
                {/* <TouchableOpacity
                    style={styles.moreExploreBar2}
                            >
                    <Text>감시자들 더보기</Text>
                  </TouchableOpacity> */}
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
            {
                  this.state.watchers.map((data, index) => (
                    <View key={data}>
                      <Watcher 
                        key={data}
                        index={index}
                        comment={this.state.watchersComment}
                      />
                    </View>
                  ))                                
                }
            {/* <TouchableOpacity
                    style={styles.moreExploreBar2}
                            >
                    <Text>감시자들 더보기</Text>
                  </TouchableOpacity> */}
          </View>

          <View style={{ marginBottom: 10 }} />
        </View>

        <View style={styles.lineDivider} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

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
    marginVertical: 15,
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
});
