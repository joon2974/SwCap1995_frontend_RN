import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class NotiTestScreen extends Component {
  state = {
    notification: null,
    messageText: '',
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('권한 허용이 없으면 알림을 할 수 없습니다!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();

    fetch('http://49.50.172.58:3000/push/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'Test',
          name: 'Test name',
        },
      }),
    });
  }

  handleNotification = (notification) => {
    this.setState({ notification });
    console.log('노티', notification);
  }

  handleChangeText = (text) => {
    this.setState({ messageText: text });
  }

  sendMessage = async () => {
    fetch('http://49.50.172.58:3000/push/message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: this.state.messageText,
      }),
    });
    this.setState({ messageText: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>테스트 메시지 입력</Text>
        <TextInput 
          value={this.state.messageText}
          onChangeText={this.handleChangeText}
        />
        <Button title="메시지 전송" onPress={this.sendMessage} />
        {this.state.notification ? this.renderNotification() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
