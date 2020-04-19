import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';


const {height, width} = Dimensions.get('window');

export default class LoginScreen extends Component{
    state = {
      ID: "",
      password: ""
    };

    gotoSignUp = () => {
      this.props.navigation.navigate('SignUpScreen');
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase
        .auth()
        .onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken);
            // Sign in with credential from the Google user.
            firebase
            .auth()
            .signInWithCredential(credential).then(function(result){
                console.log('USER SIGNED IN');
                console.log('sing in result', result);
                if(result.additionalUserInfo.isNewUser){
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .set({
                        gmail: result.user.email,
                        profile_picture: result.addionalUserInfo.profile.picture,
                        locale: result.addionalUserInfo.profile.locale,
                        first_name: result.addionalUserInfo.profile.given_name,
                        last_name: result.addionalUserInfo.profile.family_name,
                        created_at: Date.now()
                    })
                }else{
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid).update({
                        last_logged_in: Date.now()
                    })
                }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
              console.log(errorCode, ' 에러코드');
              console.log(errorMessage, ' 에러');
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }

    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            //behavior: 'web',
            androidClientId: '842449399588-59u70328kdbu3vkq9i9u9g7ice7up4d9.apps.googleusercontent.com',
            iosClientId: '842449399588-s6rl1sot9ieobk1sar5ccsa93qrtsm0n.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              this.onSignIn(result);
              return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    loginWithFacebook = async () => {
      await Facebook.initializeAsync('3059791560794838');

      const {type, token} = await Facebook.logInWithReadPermissionsAsync(
        '3059791560794838',
        {permissions: ['public_profile']}
      );

      if(type === 'success'){
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
          firebase.auth().signInWithCredential(credential).then(function(result) {
            console.log('USER SIGNED IN');
                console.log('sing in result', result);
                if(result.additionalUserInfo.isNewUser){
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .set({
                        gmail: result.user.email,
                        profile_picture: result.addionalUserInfo.profile.picture,
                        locale: result.addionalUserInfo.profile.locale,
                        first_name: result.addionalUserInfo.profile.given_name,
                        last_name: result.addionalUserInfo.profile.family_name,
                        created_at: Date.now()
                    })
                }else{
                    firebase
                    .database()
                    .ref('/users/' + result.user.uid).update({
                        last_logged_in: Date.now()
                    })
                }
          })
          .catch((error) => {
            console.log(error);
          }) 
      }else{
        console.log('facebook login failed!');
      }
    }

    logInWithPlanA = async(ID, password) => {
      try{
        firebase.auth().signInWithEmailAndPassword(ID, password).then(function(user){
          console.log(user);
        })
        .catch((error) => {
          Alert.alert('ID 혹은 비밀번호를 확인해 주세요.');
        })
      }catch(error){
        console.log(error);
      }
    }

    render(){
        const {ID, password} = this.state;
        return (
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image 
                  source={{
                    uri: 'https://ifh.cc/g/BHltgC.jpg',
                  }}
                  style={styles.logoStyle} />
              </View>
              <View style={styles.btnContainer}>

                  <View style={styles.inputContainer}>
                    <Ionicons name='ios-person' size={20} style={styles.inputIcon}/>
                    <TextInput 
                      value={ID}
                      onChangeText = {(ID) => this.setState({ID})}
                      style={styles.input}
                      placeholder='E - mail'
                      keyboardType='email-address'/>
                  </View>

                  <View style={styles.inputContainer}>
                    <Ionicons name='ios-key' size={20} style={styles.inputIcon}/>
                    <TextInput 
                      value={password}
                      onChangeText = {(password) => this.setState({password})}
                      style={styles.input}
                      placeholder='Password'
                      secureTextEntry={true}/>
                  </View>

                  <TouchableOpacity onPress={() => this.logInWithPlanA(ID, password)} style={styles.planABtn} activeOpacity={0.5}>
                    <Image 
                      source={{
                        uri: 'https://ifh.cc/g/BHltgC.jpg',
                      }}
                      style={styles.ImageIconStyle}/>
                    <View style={styles.seperatorLine}/>
                    <Text style={styles.textStyle}> Log in with Plan A ID </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.signInWithGoogleAsync()} style={styles.googleBtn} activeOpacity={0.5}>
                    <Image 
                      source={{
                        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png',
                      }}
                      style={styles.ImageIconStyle}/>
                    <View style={styles.seperatorLine}/>
                    <Text style={styles.textStyle}> Log in with Google </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.loginWithFacebook()} style={styles.facebookBtn} activeOpacity={0.5}>
                    <Image 
                      source={{
                        uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/facebook.png',
                      }}
                      style={styles.ImageIconStyle}/>
                    <View style={styles.seperatorLine}/>
                    <Text style={styles.textStyle}> Log in with Facebook </Text>
                  </TouchableOpacity>

                  <View style={styles.horizontalLine}/>

                  <View style={styles.moreInfoContainer}>
                    <TouchableOpacity onPress={() => this.gotoSignUp()} style={styles.moreInfo}>
                      <Text style={styles.moreInfoText}>회원가입</Text>
                    </TouchableOpacity>

                    <View style={styles.verticalLine}/>

                    <TouchableOpacity onPress={() => alert('비번 찾기')}style={styles.moreInfo}>
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
    },
    logoContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'flex-end',
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
      color: 'grey'
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
      height: 40
    },
    textStyle: {
      color: '#fff',
      marginBottom: 4,
      marginRight: 20,
      marginLeft: 10,
    },
    horizontalLine: {
      backgroundColor: '#D8D8D8',
      width: width * 3 / 4,
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
      justifyContent: 'center'
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