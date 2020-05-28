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
    this.state = {
      myPoint: '',
      userId: '1',
      nickname: '',
      friend_count: '',
      email: '',
      planData: [],
    };
  }

  componentDidMount() {
    this.loadUserID();
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;
      this.getUserPoint(id);
      
      this.loadAllPlan(id);
    });
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
          const obj = {
            title: responseJson[i].title,
            url: responseJson[i].image_url, 
            picturetime: responseJson[i].picture_time, 
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
    console.log('플랜데이터', this.state.planData[0].url);
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
        key={data.title}
        title={data.title}
        btnFunc={() => alert('더보기')}
        url={data.url}
        picturetime={data.picturetime}
      />
    ));
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.myInfoContainer}>
            <View style={styles.userInfoContainer}>
              <View style={styles.profilecontainer}>
                <View style={styles.halfContainer}>
                  <Image
                    source={{
                      uri: 'https://ifh.cc/g/BHltgC.jpg',
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
                    onPress={() => this.props.navigation.navigate('AddPoint')}
                  >
                    <Text>충전</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>도전 포인트</Text>
                  <Text>12</Text>
                  
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
              btnFunc={() => alert('고객센터')}
          />
            <MyPageBtn 
              btnName="비밀번호 변경"
              btnFunc={() => this.props.navigation.navigate('ChangePassword')}
          />

            <MyPageBtn 
              btnName="로그아웃"
              btnFunc={() => firebase.auth().signOut()}
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
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
    marginBottom: 15,
    marginTop: 15,
  },
});
