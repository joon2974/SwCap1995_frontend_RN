import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const { height, width } = Dimensions.get('window');

export default class LoginScreen extends Component {
  state = {
    ID: '',
    password: '',
    modalVisible: false,
  };

  gotoSignUp = () => {
    this.props.navigation.navigate('회원가입');
  };

  gotoFindPassword = () => {
    this.props.navigation.navigate('비밀번호 찾기');
  }

  sendLoginPath = (userID, isEmailLogin) => {
    axios.post('http://49.50.172.58:3000/users', {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
      is_email_login: isEmailLogin,
      email: userID,
    }).then(() => this.setState({ modalVisible: false }));
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          // eslint-disable-next-line max-len
          // eslint-disable-next-line operator-linebreak
          providerData[i].providerId ===
            // eslint-disable-next-line operator-linebreak
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    this.setState({ modalVisible: true });
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken,
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
              console.log('USER SIGNED IN');
              console.log('sign in result', result.user.email);
              this.sendLoginPath(result.user.email, false);
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.addionalUserInfo.profile.picture,
                    locale: result.addionalUserInfo.profile.locale,
                    first_name: result.addionalUserInfo.profile.given_name,
                    last_name: result.addionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // error 표시
              if (errorCode) {
                console.log(errorCode, ' 에러코드');
              } else if (errorMessage) {
                console.log(errorMessage, ' 에러');
              } else if (email) {
                console.log(email, 'email');
              } else if (credential) {
                console.log(credential, 'credential');
              }
            });
        } else {
          this.setState({ modalVisible: false });
          console.log('User already signed-in Firebase.');
        }
      }.bind(this),
    );
  };

  signInWithGoogleAsync = async () => {
    this.setState({ modalVisible: true });
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId:
          '842449399588-59u70328kdbu3vkq9i9u9g7ice7up4d9.apps.googleusercontent.com',
        iosClientId:
          '842449399588-s6rl1sot9ieobk1sar5ccsa93qrtsm0n.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        androidStandaloneAppClientId:
          '842449399588-p26hb0obemoua7gn7eglfdnkkft08mln.apps.googleusercontent.com',
      });
      this.setState({ modalVisible: false });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  loginWithFacebook = async () => {
    await Facebook.initializeAsync('3059791560794838', 'PlanA');

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      {
        permissions: ['public_profile'],
      },
    );

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          this.sendLoginPath(result.user.email, false);
          console.log('ajsjsjsjsjsjdsdsds', result.additionalUserInfo.profile);
          if (result.additionalUserInfo.isNewUser) {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                first_name: result.additionalUserInfo.profile.first_name,
                last_name: result.additionalUserInfo.profile.last_name,
                created_at: Date.now(),
              });
          } else {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .update({
                last_logged_in: Date.now(),
              });
          }
        })
        .catch((error) => {
          this.setState({ modalVisible: false });
          alert(error);
          console.log(error);
        });
    } else {
      this.setState({ modalVisible: false });
      console.log('facebook login failed!');
    }
  };

  logInWithPlanA = async (ID, password) => {
    this.setState({ modalVisible: true });
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(ID, password)
        .then((user) => {
          console.log(user);
          this.sendLoginPath(ID, true);
          this.setState({ modalVisible: false });
        })
        .catch((error) => {
          this.setState({ modalVisible: false });
          Alert.alert('ID 혹은 비밀번호를 확인해 주세요.');
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { ID, password, modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size="large" />
            <Text>불러오는 중...</Text>
          </View>
        </Modal>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://kr.object.ncloudstorage.com/swcap1995/icon.png',
            }}
            style={styles.logoStyle}
          />
        </View>
        <View style={styles.btnContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="ios-person" size={20} style={styles.inputIcon} />
            <TextInput
              value={ID}
              onChangeText={(ID) => this.setState({ ID })}
              style={styles.input}
              placeholder="E - mail"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="ios-key" size={20} style={styles.inputIcon} />
            <TextInput
              value={password}
              onChangeText={(password) => this.setState({ password })}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.logInWithPlanA(ID, password)}
            style={styles.planABtn}
            activeOpacity={0.5}
          >
            <Image
              source={{
                uri: 'https://kr.object.ncloudstorage.com/swcap1995/icon.png',
              }}
              style={styles.ImageIconStyle}
            />
            <View style={styles.seperatorLine} />
            <Text style={styles.textStyle}> Log in with Plan A ID </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.signInWithGoogleAsync()}
            style={styles.googleBtn}
            activeOpacity={0.5}
          >
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png',
              }}
              style={styles.ImageIconStyle}
            />
            <View style={styles.seperatorLine} />
            <Text style={styles.textStyle}> Log in with Google </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.loginWithFacebook()}
            style={styles.facebookBtn}
            activeOpacity={0.5}
          >
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/facebook.png',
              }}
              style={styles.ImageIconStyle}
            />
            <View style={styles.seperatorLine} />
            <Text style={styles.textStyle}> Log in with Facebook </Text>
          </TouchableOpacity>

          <View style={styles.horizontalLine} />

          <View style={styles.moreInfoContainer}>
            <TouchableOpacity
              onPress={() => this.gotoSignUp()}
              style={styles.moreInfo}
            >
              <Text style={styles.moreInfoText}>회원가입</Text>
            </TouchableOpacity>

            <View style={styles.verticalLine} />

            <TouchableOpacity
              onPress={() => this.gotoFindPassword()}
              style={styles.moreInfo}
            >
              <Text style={styles.moreInfoText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 30,
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  btnContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  inputContainer: {
    width: width - 60,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#F2F2F2',
    marginBottom: 5,
  },
  input: {
    width: width - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
    color: 'grey',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 10,
    margin: 5,
  },
  facebookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 10,
    margin: 5,
  },
  planABtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 10,
    margin: 5,
  },
  signUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BDBDBD',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 10,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  seperatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  textStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
    marginLeft: 10,
  },
  horizontalLine: {
    backgroundColor: '#D8D8D8',
    width: (width * 3) / 4,
    height: 2,
    marginTop: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  moreInfoContainer: {
    width: width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  moreInfo: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreInfoText: {
    color: '#D8D8D8',
  },
  verticalLine: {
    backgroundColor: '#D8D8D8',
    height: 20,
    width: 1,
    marginRight: 10,
  },
});
