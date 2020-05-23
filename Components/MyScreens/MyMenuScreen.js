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
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import MyPageBtn from './MyComponents/MyPageBtn';

const { height, width } = Dimensions.get('window');

export default class MyMenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPoint: '',
      userId: '1',
    };
  }

  componentDidMount() {
    this.loadUserID();
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;
      this.getUserPoint(id);
    });
  };

  getUserPoint = async (userID) => {
    console.log('유저아이디1', userID);
    const response = await axios.get(
      'http://49.50.172.58:3000/users/me/points/' + userID,
    );
    console.log(response.data);
    this.setState({ myPoint: response.data.total });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.myInfoContainer}>
            <View style={styles.profilePhotoContainer}>
              <Image
                source={{
                  uri: 'https://ifh.cc/g/BHltgC.jpg',
                }}
                style={styles.profilePhotoStyle}
                />
            </View>
            <View style={styles.userInfoContainer}>
              <View style={styles.pointContainer}>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>팔로워</Text>
                  <Text>100</Text>
                </View>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>팔로잉</Text>
                  <Text>1222</Text>
                </View>
              </View>
              <View style={styles.friendContainer}>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>포인트</Text>
                  <Text>{this.state.myPoint}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('AddPoint')}
                    >
                    <Text style={styles.text}>충전</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.quarterContainer}>
                  <Text style={styles.userInfoMenuText}>도전 포인트</Text>
                  <Text>12</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.calendarContainer}>
            <Text>달력 출력</Text>
          </View>

          <View style={styles.planContainer}>
            <Text>플랜 정보</Text>
          </View>

          <MyPageBtn 
            btnName="비밀번호 변경하기"
            btnFunc={() => this.props.navigation.navigate('ChangePassword')}
          />

          <MyPageBtn 
            btnName="로그 아웃"
            btnFunc={() => firebase.auth().signOut()}
          />
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
    marginTop: 30,
    backgroundColor: 'white',
  },
  myInfoContainer: {
    width: width,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  profilePhotoContainer: {
    width: width / 3,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoStyle: {
    width: 100,
    height: 100,
    borderRadius: 40,
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
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planContainer: {
    width: width,
    height: height / 3,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: 60,
    height: 35,
    backgroundColor: '#fe5746',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
