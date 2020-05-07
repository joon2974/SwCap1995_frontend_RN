import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import InputInfo from '../LogInScreens/InputInfo';

export default class HomeMain extends Component {
  state = { informCheck: false };

  componentDidMount() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      const email = currentUser.email;
      this.isInfoContain(email);
    }
  }

  isInfoContain = eMail => {
    axios
      .post('http://49.50.172.58:3000/users/is_user', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        email: eMail,
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        this.state.informCheck = true;
        this.forceUpdate();
        console.log(error);
      });
  };

  render() {
    const { informCheck } = this.state;

    if (informCheck) {
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
