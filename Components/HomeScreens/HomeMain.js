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
import InputInfo from '../LogInScreens/InputInfo';
import MyPlan from '../MyScreens/MyComponents/MyPlan';

let currentUser;
let isInformCheck;

const { width, height } = Dimensions.get('window');
export default class HomeMain extends Component {
  state = { 
    isInformChecked: false,
    userEmail: '',
  }; 

  componentDidMount() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      const email = currentUser.email;
      this.setState({ userEmail: email });
      this.isInfoContain(email);
    }
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

  render() {
    const { isInformChecked, userEmail } = this.state;

    if (isInformChecked) {
      return (
        <View style={styles.container}>
          <View style={styles.planContainer}>
            <Text>진행중인 플랜</Text>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingStart: 5,
                paddingEnd: 5,
              }}
                            >
              <MyPlan 
                btnFunc={() => alert('더보기')} />
              <MyPlan 
                btnFunc={() => alert('더보기')} />              
              <MyPlan 
                btnFunc={() => alert('더보기')} />              
              <MyPlan 
                btnFunc={() => alert('더보기')} />
            </ScrollView>
          </View>
          <View style={styles.planContainer}>
            <Text>감시중인 플랜</Text>
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                paddingStart: 5,
                paddingEnd: 5,
              }}
                            >
              <MyPlan 
                btnFunc={() => alert('더보기')} />              
              <MyPlan 
                btnFunc={() => alert('더보기')} />              
              <MyPlan 
                btnFunc={() => alert('더보기')} />              
              <MyPlan 
                btnFunc={() => alert('더보기')} />
            </ScrollView>
          </View>
        </View>
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
    
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.4,
  },
});
