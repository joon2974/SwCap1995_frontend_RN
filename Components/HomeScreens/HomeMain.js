import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  RefreshControl,
  Modal,
  Vibration,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Notifications } from 'expo';
import InputInfo from '../LogInScreens/InputInfo';
import MyPlan from '../MyScreens/MyComponents/MyPlan';

let currentUser;
let isInformCheck;
const { width, height } = Dimensions.get('window');
export default class HomeMain extends Component {
  state = {
    userEmail: '',
    userId: '',
    planData: [],
    watchData: [],
    refreshing: false,
    modalVisible: false,

  };

  componentDidMount() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      const email = currentUser.email;
      this.setState({ userEmail: email });
      this.isInfoContain(email).then(() => {
        this.loadUserID().then(() => {
          this.loadAllPlan(this.state.userId);
        });
      });
    }
    Notifications.addListener((notification) => {
      Vibration.vibrate();
      var page = notification.data.screen;
      if (page === 'friend') {
        this.props.navigation.dangerouslyGetParent().navigate('Friend');
      }
    });
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

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.setState({ userId: id });
    });
  };

  moveToPlan = () => {
    this.props.navigation.dangerouslyGetParent().navigate('Plan');
  };
  

  loadAllPlan = async (userId) => {
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
    const watchresponse = await axios.get(
      'http://49.50.172.58:3000/plans/watchingAll/' + userId,
    );
    const watchresponseJson = await watchresponse.data.rows;
    const watchcount = await watchresponse.data.count;
    
    try {
      if (watchcount !== 0) {
        for (var l = 0; l < watchcount; l++) {
          const obj = {
            title: watchresponseJson[l].title,
            url: watchresponseJson[l].image_url,
            picturetime: watchresponseJson[l].picture_time,
            id: watchresponseJson[l].id,
            nickname: watchresponseJson[l].user.nickname,
            status: watchresponseJson[l].status,
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

  moveToAuthenticationList = (planID) => {
    this.props.navigation.navigate('인증 리스트', { planID: planID });
  }

  moveToWatchPage = (data) => {
    if (data.status === 'waiting') {
      axios.post(
        'http://49.50.172.58:3000/agreements/is_exist', {
          user_id: this.state.userId,
          plan_id: data.id,
        },
      ).then(() => { this.props.navigation.navigate('플랜평가하기', { id: data.id, refreshFunc: this.onRefresh }); })
        .catch(() => {
          alert('이미 평가하셨습니다');
        }); 
    } else this.props.navigation.navigate('감시 리스트', { planID: data.id, userID: this.state.userId });
  }

  setModalInvisible = () => {
    this.setState({ modalVisible: false });
  };

  isInfoContain = async (eMail) => {
    isInformCheck = await axios
      .post('http://49.50.172.58:3000/users/is_user', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        email: eMail,
      })
      .then((res) => {
        if (res.data.id) {
          AsyncStorage.getItem('UserID').then(() => {
          });
       
          AsyncStorage.setItem('UserID', res.data.id.toString());

          AsyncStorage.getItem('UserID').then(() => {
          });
          this.setState({ userId: res.data.id });
        } else {
          this.setState({ modalVisible: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  cameraCertify = (planId) => {
    this.props.navigation.navigate('일일인증: 카메라', { userID: this.state.userId, planID: planId, returnFunc: this.returnToTop });
  }

  galaryCertify = (planId) => {
    this.props.navigation.navigate('일일인증: 갤러리', { userID: this.state.userId, planID: planId, returnFunc: this.returnToTop });
  }

  faceAuthentication = (planId, authMethod, pictureTime) => {
    const currentDate = Date();
    const currentTime = currentDate.split(' ')[4];
    const currentHour = Number(currentTime.split(':')[0]);
    const currentMinute = Number(currentTime.split(':')[1]);
    if (((currentHour === pictureTime - 1) && currentMinute >= 30) 
      || ((currentHour === pictureTime + 1) && currentMinute <= 30)) {
      this.props.navigation.navigate('일일인증: 본인인증', 
        {
          cameraCertify: this.cameraCertify,
          galaryCertify: this.galaryCertify,
          userID: this.state.userId,
          planID: planId,
          certifyMethod: authMethod,
        });
    } else {
      alert('인증 시간이 아닙니다!');
    }
  }

  returnToTop = () => {
    this.props.navigation.popToTop();
    this.onRefresh();
  }

  render() {
    const {
      userEmail,
      planData,
      watchData,
      modalVisible,
    } = this.state;
    const plans = planData.map((data) => (
      <MyPlan
        key={data.id}
        planId={data.id}
        title={data.title}
        btnFunc={this.moveToEstimate}
        url={data.url}
        picturetime={data.picturetime}
        status={data.status}
        certifyMethod={data.authentication_way}
        faceAuthentication={this.faceAuthentication}
        today_auth={data.today_auth}
      />
    ));
    const watchplans = watchData.map((data) => (
      <MyPlan
        key={data.id}
        title={data.title}
        id={data.id}
        btnFunc={() => { this.moveToWatchPage(data); }}
        url={data.url}
        picturetime={data.picturetime}
        nickname={data.nickname}
        status={data.status}
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <InputInfo
            modalCloseFunc={this.setModalInvisible}
            userEmail={userEmail}
          />
        </Modal>
        <LinearGradient colors={['white', '#FBEFEF']} style={styles.container}>
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
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
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
              </View>

              {watchplans}
              {!watchplans.length && (
                <View style={styles.addContainer}>
                  <Text>감시중인 플랜이 없습니다</Text>
                  <TouchableOpacity
                    style={{ height: 50, width: 50, backgroundColor: 'red' }}
                    onPress={() => this.props.navigation.navigate('WatcherPage')}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planContainer: {
    width: width,
    height: height * 0.403,
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
