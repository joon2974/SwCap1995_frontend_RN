import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions, 
  ScrollView,
  Image,
} from 'react-native';
import firebase from 'firebase';
import MyPageBtn from './MyComponents/MyPageBtn';

const { height, width } = Dimensions.get('window');

export default class MyMenuScreen extends Component {
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
                  <Text>1020</Text>
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
            btnName="비밀번호 찾기"
            btnFunc={() => alert('비밀번호 찾기')}
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
});
