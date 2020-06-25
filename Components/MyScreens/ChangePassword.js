import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import firebase from 'firebase';

const { width } = Dimensions.get('window');
export default class ChangePassWord extends Component {
    state = {
      password: '',
      newPassword: '',
    };


    changepassword() {
      var user = firebase.auth().currentUser;
      var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.password,
      );
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
            style={styles.nextStepBtn}
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
    borderRadius: 5,
    height: 40,
    width: width / 2,
    marginBottom: 20,
  },
  nextStepBtn: {
    width: width / 2,
    height: 40,
    backgroundColor: '#FD8A69',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 30,
    marginBottom: 10,
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
});
