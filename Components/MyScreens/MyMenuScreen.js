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
  Button,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import MyPageBtn from './MyComponents/MyPageBtn';
import MyPlan from './MyComponents/MyPlan';
import PlanCalendar from './MyComponents/PlanCalendar';

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
      this.loadNotice();
      this.loadAllPlan(id);
    });
  };
  
  loadNotice = async () => {
    const response = await axios.get(
      'http://49.50.172.58:3000/notices/recent',
    );
    console.log(response.data);
    this.setState({ notice: response.data.title });
  };


  loadAllPlan = async (userId) => {
    console.log('유저아이디1', userId);
    const response = await axios.get(
      'http://49.50.172.58:3000/plans/all/' + userId,
    );
    console.log(response.data);
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
    console.log('유저아이디1', userID);
    const response = await axios.get(
      'http://49.50.172.58:3000/users/me/' + userID,
    );
    console.log(response.data);
    this.setState({
      myPoint: response.data.point.challenge_total,
      nickname: response.data.nickname,
      friend_count: response.data.friend_count, 
      email: response.data.email,
    });
  };

  render() {
    const { planData } = this.state;
    const plans = planData.map((data) => (
      <MyPlan
        key={data.id}
        title={data.title}
        btnFunc={() => alert('더보기')}
        url={data.url}
        picturetime={data.picturetime}
        percent={data.percent}
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
                  <Text style={styles.userInfoMenuText}>포인트</Text>
                  <Text>{this.state.myPoint}</Text> 
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('포인트 충전', { onRefresh: this.onRefresh })}
                  >
                    <Text>충전</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>도전 포인트</Text>
                  <Text>12</Text>
                  <Button title="테스트" onPress={() => this.props.navigation.navigate('카메라 테스트')} />
                  <View style={{ height: 35 }} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.lineDivider} />
          <View style={styles.calendarContainer}>
            <PlanCalendar />
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
            {plans}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <MyPageBtn 
              btnName="고객센터"
              btnFunc={() => this.props.navigation.navigate('문의하기', { userId: this.state.userId })}
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
    width: width * 0.33,
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
});
