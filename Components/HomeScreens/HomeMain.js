import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import InputInfo from '../LogInScreens/InputInfo';
import MyPlan from '../MyScreens/MyComponents/MyPlan';
import { Constants } from 'expo-camera';

console.disableYellowBox = true;
let currentUser;
let isInformCheck;
const { width, height } = Dimensions.get('window');
export default class HomeMain extends Component {
  state = {
    isInformChecked: false,
    userEmail: '',
    userId: '',
    planData: [],
    watchData: [],
    refreshing: false,
  };

  componentDidMount() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      const email = currentUser.email;
      this.setState({ userEmail: email });
      this.isInfoContain(email);
    }
    this.loadUserID();
  }

  componentWillUnmount() {
    clearTimeout(currentUser);
    clearTimeout(isInformCheck);
  }

  onRefresh = () => {
    this.setState({
      planData: [],
      watchData: [],
    });
    this.setState({ refreshing: true });
    this.loadAllPlan(this.state.userId).then(() => {
      this.setState({ refreshing: false });
    });
  };

  // Async 확인용
  checkAsync = async () => {
    const ji = await AsyncStorage.getItem('UserID');
    console.log('asdf', ji);
  };

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then(id => {
      this.state.userId = id;
      this.loadAllPlan(id);
    });
  };

  moveToPlan = () => {
    this.props.navigation.dangerouslyGetParent().navigate('Plan');
  };

  loadAllPlan = async userId => {
    console.log('유저아이디1', userId);
    const response = await axios.get(
      'http://49.50.172.58:3000/plans/all/' + userId,
    );
    const responseJson = await response.data.rows;
    const count = await response.data.count;
    var planarray;
    var watcharray;
    try {
      if (count !== 0) {
        for (var i = 0; i < count; i++) {
          const obj = {
            title: responseJson[i].title,
            url: responseJson[i].image_url,
            picturetime: responseJson[i].picture_time,
            id: responseJson[i].id,
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
    const watchresponse = await axios.get(
      'http://49.50.172.58:3000/plans/watchingAll/' + userId,
    );
    const watchresponseJson = await watchresponse.data.rows;
    const watchcount = await watchresponse.data.count;

    try {
      if (count !== 0) {
        for (var l = 0; l < watchcount; l++) {
          const obj = {
            title: watchresponseJson[l].title,
            url: watchresponseJson[l].image_url,
            picturetime: watchresponseJson[l].picture_time,
            id: watchresponseJson[l].id,
            nickname: watchresponseJson[l].user.nickname,
          };
          watcharray = this.state.watchData.concat(obj);
          this.setState({
            watchData: watcharray,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  moveToPlan = () => {
    this.props.navigation.dangerouslyGetParent().navigate('Plan');
  };

  isInfoContain = async eMail => {
    isInformCheck = await axios
      .post('http://49.50.172.58:3000/users/is_user', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        email: eMail,
      })
      .then(res => {
        if (res.data.id) {
          console.log('데이터 이미 존재');
          AsyncStorage.setItem('UserID', res.data.id.toString());
          this.setState({ isInformChecked: true });
        } else {
          console.log(res);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { isInformChecked, userEmail, planData, watchData } = this.state;
    const plans = planData.map(data => (
      <MyPlan
        key={data.id}
        title={data.title}
        btnFunc={() => alert('더보기')}
        url={data.url}
        picturetime={data.picturetime}
      />
    ));
    const watchplans = watchData.map(data => (
      <MyPlan
        key={data.id}
        title={data.title}
        btnFunc={() => alert('더보기')}
        url={data.url}
        picturetime={data.picturetime}
        nickname={data.nickname}
      />
    ));
    if (isInformChecked) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="white"
            />
          }
        >
          <LinearGradient
            colors={['white', '#FBEFEF']}
            style={styles.container}
          >
            <View style={styles.planContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                }}
              >
                <View style={{ marginRight: 30, marginLeft: 10 }}>
                  <Text>도전중인</Text>
                  <Text>플랜</Text>
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
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.planContainer}>
              {watchplans.length > 0 && (
                <>
                  <ScrollView>
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle=
                    {{
                      alignItems: 'center',
                      paddingEnd: 5,
                    }}
                    >
                    <View style={{ marginRight: 30, marginLeft: 10 }}>
                      <Text>감시중인</Text>
                      <Text>플랜</Text>
                      <Image
                        source={{
                          uri:
                            'https://kr.object.ncloudstorage.com/swcap1995/001-right-arrow-1.png',
                        }}
                        style={{ width: 50, height: 50, marginTop: 20 }}
                      />
                      {watchplans}
                    </View>
                  </ScrollView>
                </>
              )}
              {!watchplans.length && (
                <>
                  <View style={styles.noplans}>
                    <Text>감시중인 플랜이 없습니다</Text>
                  </View>
                </>
              )}
            </View>
          </LinearGradient>
        </ScrollView>
      );
    } else if (isInformChecked === false) {
      return (
        <InputInfo checkFunc={this.informExistCheck} userEmail={userEmail} />
      );
    } else {
      return <ActivityIndicator />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planContainer: {
    width: width,
    height: height * 0.43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
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
  noplans: {
    width: width * 0.7,
    height: width / 1.6,
    backgroundColor: 'white',
    borderRadius: 5,
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
  addBtnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
