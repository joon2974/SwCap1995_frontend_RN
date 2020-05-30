import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import InputInfo from '../LogInScreens/InputInfo';
import MyPlan from '../MyScreens/MyComponents/MyPlan';

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
  }; 

  componentDidMount() {
    const i = this.props.navigation.dangerouslyGetParent();
    console.log('aa', i);
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
          console.log('데이터 이미 존재');
          AsyncStorage.setItem('UserID', res.data.id.toString());
          this.setState({ isInformChecked: true });
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  informExistCheck = () => {
    this.setState({ isInformChecked: true });
  }

  // Async 확인용
  checkAsync = async () => {
    const ji = await AsyncStorage.getItem('UserID');
    console.log('asdf', ji);
  }

  loadUserID = async () => {
    await AsyncStorage.getItem('UserID').then((id) => {
      this.state.userId = id;
      this.loadAllPlan(id);
    });
  };

  loadAllPlan = async (userId) => {
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

  render() {
    const {
      isInformChecked, userEmail, planData, watchData, 
    } = this.state;
    const plans = planData.map((data) => (
      <MyPlan
        key={data.id}
        title={data.title}
        btnFunc={() => alert('더보기')}
        url={data.url}
        picturetime={data.picturetime}
      />
    ));
    const watchplans = watchData.map((data) => (
      <MyPlan
        key={data.id}
        title={data.title}
        btnFunc={() => alert('더보기')}
        url={data.url}
        picturetime={data.picturetime}
      />
    ));
    if (isInformChecked) {
      return (
        <ScrollView>
          <LinearGradient colors={['white', '#FBEFEF']} style={styles.container}>
            <View style={styles.planContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>진행중인 플랜</Text>
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
            </View>
            <View style={styles.lineDivider} />
            <View style={styles.planContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>감시중인 플랜</Text>
              <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: 'center',
                  paddingStart: 5,
                  paddingEnd: 5,
                }}
              >
                {watchplans}
              </ScrollView>
            </View>
          </LinearGradient>
        </ScrollView>
      );
    } else if (isInformChecked === false) {
      return <InputInfo checkFunc={this.informExistCheck} userEmail={userEmail} />;
    } else {
      return <ActivityIndicator />;
    }
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
    marginTop: 20,
    width: width * 0.9,
    height: height * 0.38,
  },  
  lineDivider: {
    backgroundColor: '#F2F2F2',
    width: width - 30,
    height: 1.5,
    marginLeft: 15,
  },
});
