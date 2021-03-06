import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions, 
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  RefreshControl,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import {
  ContributionGraph,
} from 'react-native-chart-kit';
import { AntDesign } from '@expo/vector-icons';
import MyPageBtn from './MyComponents/MyPageBtn';
import MyPlan from './MyComponents/MyPlan';

const { height, width } = Dimensions.get('window');

export default class MyMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      myPoint: '',
      userId: '1',
      nickname: '',
      friend_count: '',
      email: '',
      planData: [],
      refreshing: false,
      notice: '',
      challPoint: '',
      commits: [],
    };
  }

  componentDidMount() {
    this.loadUserID();
  }

  onRefresh = () => {
    this.setState({
      planData: [],
    });
    this.setState({ refreshing: true });
    this.loadUserID().then(() => {
      this.setState({ refreshing: false });
    });
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;
      this.getUserPoint(id);
      this.getUsercommits(id);
      this.loadNotice();
      this.loadAllPlan(id);
    });
  };
  
  loadNotice = async () => {
    const response = await axios.get(
      'http://49.50.172.58:3000/notices/recent',
    );
    this.setState({ notice: response.data.title });
  };


  loadAllPlan = async (userId) => {
    const response = await axios.get(
      'http://49.50.172.58:3000/plans/all/' + userId,
    );
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    var planarray;
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          const planPercent = (responseJson[i].daily_authentications.length !== 0 
            ? responseJson[i].daily_authentications.length 
            / (responseJson[i].plan_period * 7) : 0);
          const obj = {
            title: responseJson[i].title,
            url: responseJson[i].image_url, 
            picturetime: responseJson[i].picture_time, 
            id: responseJson[i].id,
            percent: planPercent,
            status: responseJson[i].status,
            authentication_way: responseJson[i].authentication_way,
            today_auth: responseJson[i].today_auth,
            
          };
          planarray = this.state.planData.concat(obj);
          this.setState({
            planData: planarray,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  getUserPoint = async (userID) => {
    const response = await axios.get(
      'http://49.50.172.58:3000/users/me/' + userID,
    );
    this.setState({
      myPoint: response.data.point.general_total,
      nickname: response.data.nickname,
      friend_count: response.data.friend_count, 
      email: response.data.email,
      challPoint: response.data.point.challenge_total,
    });
  };

  isEmptyObject = (param) => Object.keys(param).length === 0 && param.constructor === Object

  getUsercommits = async (userID) => {
    const response = await axios.get(
      'http://49.50.172.58:3000/users/auth_record/' + userID,
    );

    if (this.isEmptyObject(response.data)) {
      console.log('commits are empty!');
    } else {
      const commitArray = [];
      const keyArray = Object.keys(response.data);

      for (let i = 0; i < keyArray.length; i++) {
        const tempObject = {};
        tempObject.date = keyArray[i];
        tempObject.count = response.data[tempObject.date];
        commitArray.push(tempObject);
      }

      this.setState({ commits: commitArray });
    }
  };

  moveToPlan = () => {
    this.props.navigation.dangerouslyGetParent().navigate('Plan');
  };

  render() {
    const { planData, challPoint, commits } = this.state;
    const plans = planData.map((data) => (
      <MyPlan
        key={data.id}
        planId={data.id}
        title={data.title}
        btnFunc={() => { this.moveToAuthenticationList(data.id); }}
        url={data.url}
        picturetime={data.picturetime}
        status={data.status}
        certifyMethod={data.authentication_way}
        faceAuthentication={this.faceAuthentication}
        today_auth={data.today_auth}
        percent={data.percent}
        isMyMenu={true}
      />
    ));

    return (
      
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="white"
    />
  )}
      >
        <View style={styles.container}>
          <View style={styles.noticeContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>공지사항</Text>
            
            <View style={styles.lineDivider} />
            <Text style={{ fontSize: 20 }}>{this.state.notice}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => this.props.navigation.navigate('공지사항')}
                  >
              <Text>더보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lineDivider} />
          <View style={styles.myInfoContainer}>
            <View style={styles.userInfoContainer}>
              <View style={styles.profilecontainer}>
                <View style={styles.halfContainer}>
                  <Image
                    source={{
                      uri: 'https://kr.object.ncloudstorage.com/swcap1995/icon.png',
                    }}
                    style={styles.profilePhotoStyle}
                />
                </View>
                <View>  
                  <Text>{this.state.nickname}</Text>
                  <Text>{this.state.email}</Text>
                </View>
              </View>
              
              <View style={styles.friendContainer}>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>친구 수</Text>
                  <Text>{this.state.friend_count}</Text>
                  <View style={{ height: 35 }} />
                </View>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>도전 포인트</Text>
                  <Text>{challPoint}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('포인트 충전', { onRefresh: this.onRefresh })}
                  >
                    <Text>충전</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}> 보너스 포인트</Text>
                  <Text>{this.state.myPoint}</Text> 
                  <View style={{ height: 35 }} />
                </View>
              </View>
            </View>
          </View>


          <View style={styles.lineDivider} />
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingStart: 5,
              paddingEnd: 5,
            }}
          >
                              
            <View style={{ marginRight: 30, marginLeft: 10 }}>
              <Text>내 플랜</Text>
              <Text>보기</Text>
              <Image
                source={{
                  uri:
                      'https://kr.object.ncloudstorage.com/swcap1995/001-right-arrow-1.png',
                }}
                style={{ width: 50, height: 50, marginTop: 20 }}
                />
            </View>
            {plans}
            <View style={styles.addContainer}>
              <TouchableOpacity
                style={styles.addBtnContainer}
                onPress={this.moveToPlan}
                >
                <AntDesign name="pluscircleo" size={70} color="black" />
                <Text>플랜 만들러 가기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          
          <View style={styles.lineDivider} />
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>목표달성 색칠하기</Text>
          </View>
          <View style={{ backgroundColor: '#FD8A69', borderRadius: 16 }}>
            <ContributionGraph
              values={commits}
              endDate={new Date('2020-08-10')}
              numDays={85}
              width={width - 50}
              height={220}
              gutterSize={0.7}
              chartConfig={{
                backgroundGradientFrom: '#FD8A69',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: '#FD8A69',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <MyPageBtn 
              btnName="고객센터"
              btnFunc={() => this.props.navigation.navigate('고객센터', { userId: this.state.userId })}
          />
            <MyPageBtn 
              btnName="비밀번호 변경"
              btnFunc={() => this.props.navigation.navigate('비밀번호 변경', { userId: this.userId })}
          />

            <MyPageBtn 
              btnName="로그아웃"
              btnFunc={() => {
                firebase.auth().signOut();
                AsyncStorage.removeItem('UserID');
              }}
          />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  myInfoContainer: {
    marginTop: 10,
    width: width * 0.9,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: 'white',
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
  profilePhotoContainer: {
    width: width / 3,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoStyle: {
    width: 80,
    height: 70,
    marginTop: 10,
    borderRadius: 25,
  },
  userInfoContainer: {
    height: height / 4,
    width: width * 0.66,
  },
  pointContainer: {
    height: height / 8,
    width: width * 0.66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  friendContainer: {
    height: height / 8,
    width: width * 0.66,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  quarterContainer: {
    height: height / 8,
    width: width * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoMenuText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  calendarContainer: {
    width: width,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planContainer: {
    width: width,
    height: height / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 15,
    width: 60,
    height: 30,
    backgroundColor: '#FD8A69',
    justifyContent: 'center',
    alignItems: 'center',
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
  profilecontainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  halfContainer: {
    height: height / 8,
    marginRight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 65,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 15,
  },
  noticeContainer: {
    marginTop: 10,
    width: width * 0.9,
    height: height / 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
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
  addContainer: {
    width: width * 0.7,
    height: width / 1.6,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    marginRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  addBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
