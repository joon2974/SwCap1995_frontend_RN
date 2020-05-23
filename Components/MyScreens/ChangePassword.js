import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import firebase from 'firebase';

export default class ChangePassWord extends Component {
    state = {
      password: '',
      newPassword: '',
    };


    changepassword() {
      console.log('비밀번호는', this.state.newPassword);
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.password,
      );
      console.log('재인증', this.state.newPassword);
      var newPassword = this.state.newPassword;
      user.reauthenticateWithCredential(credential).then(function () {
        var user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(function () {
          alert('비밀번호 변경 성공');
        });
        console.log('재인증성공');
      });
    }

    render() {
      const { password, newPassword } = this.state;
      return (
        <View style={styles.container}>
          <Text>현재 비밀번호</Text>
          <TextInput 
            value={password}
            onChangeText={(password) => this.setState({ password })}
            style={styles.input} />
          <Text>새로운 비밀번호</Text>
          <TextInput 
            value={newPassword}
            onChangeText={(newPassword) => this.setState({ newPassword })}
            style={styles.input} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => this.changepassword()}>
            <Text style={styles.text}>비밀번호 변경</Text>
          </TouchableOpacity>
        </View>
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
  input: {
    borderWidth: 2,
    height: 40,
    width: 180,
    marginBottom: 20,
  },
  button: {
    height: 30,
    width: 80,
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
