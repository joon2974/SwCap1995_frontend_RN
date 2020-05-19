import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import InputInfo from '../LogInScreens/InputInfo';

let currentUser;
let isInformCheck;

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

  isInfoContain = (eMail) => { 
    isInformCheck = axios
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
          this.state.isInformChecked = true;
          this.forceUpdate();
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
          <Text>Home Main</Text>
          <Button
            title="Go To Mypage"
            onPress={() => this.props.navigation.navigate('MyMenuScreen')}
          />
          <Button
            title="Go To Test Page"
            onPress={() => this.props.navigation.navigate('NotiTestScreen')}
          />
        </View>
      );
    } else {
      return <InputInfo checkFunc={this.informExistCheck} userEmail={userEmail} />;
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
});
