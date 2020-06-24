import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_REGISTRATION_ENDPOINT = 'http://49.50.172.58:3000/push/token';
const MESSAGE_ENPOINT = 'http://49.50.172.58:3000/push/message';

export default class NotiTextScreen extends React.Component {
  state = {
    notification: null,
    messageText: '',
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  handleNotification = (notification) => {
    this.setState({ notification });
  }

  handleChangeText = (text) => {
    this.setState({ messageText: text });
  }

  sendMessage = async () => {
    fetch(MESSAGE_ENPOINT, {
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

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    fetch(PUSH_REGISTRATION_ENDPOINT, {
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
          username: 'warly',
          name: 'Dan Ward',
        },
      }),
    });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  renderNotification() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>A new message was recieved!</Text>
        <Text>{this.state.notification.data.message}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.messageText}
          onChangeText={this.handleChangeText}
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.sendMessage} 
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        {this.state.notification
          ? this.renderNotification()
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#474747',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: 300,
    borderColor: '#f6f6f6',
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  label: {
    fontSize: 18,
  },
});
