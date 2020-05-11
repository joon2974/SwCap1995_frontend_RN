import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import InputInfo from '../LogInScreens/InputInfo';

let currentUser;
let isInformCheck;

export default class HomeMain extends Component {
  state = { isInformChecked: false };

  componentDidMount() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      const email = currentUser.email;
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

  render() {
    const { isInformChecked } = this.state;

    if (isInformChecked) {
      return (
        <View style={styles.container}>
          <Text>Home Main</Text>
          <Button
            title="Go To Mypage"
            onPress={() => this.props.navigation.navigate('MyMenuScreen')}
          />
        </View>
      );
    } else {
      return <InputInfo />;
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
