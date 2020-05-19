import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import AgePicker from './LoginComponents/AgePicker';
import CheckBox from './LoginComponents/CheckBox';

const { height, width } = Dimensions.get('window');
const ageList = [];
for (let i = 13; i < 41; i++) {
  ageList.push(i.toString());
}
let login;

export default class SignUpScreen extends Component {
  state = {
    ID: '',
    password: '',
    password2: '',
    male: false,
    female: false,
    cat1: null,
    cat2: null,
    cat3: null,
    cat4: null,
    cat5: null,
    cat6: null,
    ableID: false,
    emailInfo: '',
    age: null,
    nickname: '',
    nicknameInfo: '',
    ableNickname: false,
    token: null,
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  componentWillUnmount() {
    clearTimeout(login);
  }

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: token });
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  handleNotification = (notification) => {
    console.log('노티피케이션', notification);
  }

  signUp = (
    ID,
    password,
    password2,
    male,
    female,
    cat1,
    cat2,
    cat3,
    cat4,
    cat5,
    cat6,
    ableID,
    age,
    ableNickname,
    nickname,
    token,
  ) => {
    try {
      if (ID < 1 || password.length < 6) {
        alert('ID는 e-mail형태, 비밀번호는 6자리 이상이어야 합니다!');
      } else if (!(password === password2)) {
        alert('비밀번호를 확인해 주세요!');
      } else if (!ableID) {
        alert('Email을 확인해 주세요!');
      } else if (!ableNickname) {
        alert('닉네임을 확인해 주세요!!');
      } else if (!(male || female)) {
        alert('성별을 선택해 주세요!');
      } else if (!age) {
        alert('나이를 선택해 주세요!');
      } else {
        const categories = this.catList(cat1, cat2, cat3, cat4, cat5, cat6);
        const sex = male ? 'male' : 'female';

        console.log('아이디', ID);
        console.log('성별', sex);
        console.log('나이', age);
        console.log('카테고리', categories);
        console.log('토큰', token);

        axios
          .post('http://49.50.172.58:3000/users', {
            headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            },
            email: ID,
            sex: sex,
            age: age,
            categories: categories,
            is_email_login: true,
            nickname: nickname,
            deviceToken: token,
          })
          .then((res) => {
            console.log(res);
            login = firebase
              .auth()
              .createUserWithEmailAndPassword(ID, password)
              .catch((error) => {
                console.log(error);
                alert('ID는 e-mail형태, 비밀번호는 6자리 이상이어야 합니다');
              });
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  catList = (cat1, cat2, cat3, cat4, cat5, cat6) => {
    let categories = [];

    categories.push({ name: '운동', value: cat1 });
    categories.push({ name: '공부', value: cat2 });
    categories.push({ name: '감정', value: cat3 });
    categories.push({ name: '생활습관', value: cat4 });
    categories.push({ name: '자기계발', value: cat5 });
    categories.push({ name: '기타', value: cat6 });

    categories = categories.filter((v) => v.value !== null);
    categories = categories.map((v) => v.name);

    return categories;
  };

  checkEmail = (ID) => {
    axios
      .post('http://49.50.172.58:3000/users/is_user', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        email: ID,
      })
      .then((res) => {
        if (res.data.id) {
          this.state.ableID = false;
          this.state.emailInfo = '중복된 ID입니다.';
          this.forceUpdate();
        } else {
          this.state.ableID = true;
          this.state.emailInfo = '사용가능한 ID입니다.';
          this.forceUpdate();
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkNickname = (nickname) => {
    axios
      .post('http://49.50.172.58:3000/users/is_nickname', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        nickname: nickname,
      })
      .then((res) => {
        this.state.ableNickname = true;
        this.state.nicknameInfo = '사용가능한 닉네임입니다.';
        this.forceUpdate();
        console.log(res);
      })
      .catch((error) => {
        this.state.ableNickname = false;
        this.state.nicknameInfo = '중복된 닉네임입니다.';
        this.forceUpdate();
        console.log(error);
      });
  };

  render() {
    const {
      ID,
      password,
      password2,
      male,
      female,
      cat1,
      cat2,
      cat3,
      cat4,
      cat5,
      cat6,
      ableID,
      age,
      emailInfo,
      nickname,
      nicknameInfo,
      ableNickname,
      token,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.signUpContainer}>
            <View style={styles.lineContainer}>
              <View style={styles.lineTextContainer}>
                <Text>이메일</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  value={ID}
                  onChangeText={(ID) => this.setState({ ID })}
                  style={styles.input}
                  placeholder="abc@example.com"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.lineContainer}>
              <TouchableOpacity
                style={styles.checkBtn}
                onPress={() => {
                  this.checkEmail(ID);
                }}
              >
                <Text style={{ color: 'white' }}>중복 확인</Text>
              </TouchableOpacity>
              <View style={styles.idCheckResult}>
                <Text>{emailInfo}</Text>
              </View>
            </View>

            <View style={styles.lineContainer}>
              <View style={styles.lineTextContainer}>
                <Text>닉네임</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  value={nickname}
                  onChangeText={(nickname) => this.setState({ nickname })}
                  style={styles.input}
                  placeholder="nickname"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.lineContainer}>
              <TouchableOpacity
                style={styles.checkBtn}
                onPress={() => {
                  this.checkNickname(nickname);
                }}
              >
                <Text style={{ color: 'white' }}>중복 확인</Text>
              </TouchableOpacity>
              <View style={styles.idCheckResult}>
                <Text>{nicknameInfo}</Text>
              </View>
            </View>

            <View style={styles.lineContainer}>
              <View style={styles.lineTextContainer}>
                <Text>비밀번호</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  value={password}
                  onChangeText={(password) => this.setState({ password })}
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={true}
                />
              </View>
            </View>

            <View style={styles.lineContainer}>
              <View style={styles.lineTextContainer}>
                <Text>비번 확인</Text>
              </View>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  value={password2}
                  onChangeText={(password2) => this.setState({ password2 })}
                  style={styles.input}
                  placeholder="Password validation"
                  secureTextEntry={true}
                />
              </View>
            </View>

            <View style={styles.sexContainer}>
              <View style={styles.lineTextContainer}>
                <Text>성별</Text>
              </View>
              <TouchableOpacity
                style={male ? styles.sexChecked : styles.sexUnchecked}
                onPress={() => this.setState({
                  male: true,
                  female: false,
                })
                }
              >
                <Text>남자</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={female ? styles.sexChecked : styles.sexUnchecked}
                onPress={() => this.setState({
                  male: false,
                  female: true,
                })
                }
              >
                <Text>여자</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ageContainer}>
              <View style={styles.lineTextContainer}>
                <Text>나이</Text>
              </View>
              <View style={styles.pickerContainer}>
                <AgePicker
                  age={age}
                  onValueChange={(itemValue) => this.setState({ age: itemValue })}
                  ages={ageList}
                />
              </View>
            </View>

            <View style={styles.categoryContainer}>
              <View style={styles.lineTextContainer}>
                <Text>관심사</Text>
              </View>
              <View style={styles.categoriesContainer}>
                <CheckBox
                  isChecked={cat1}
                  categoryName="운동"
                  checkedStyle={styles.categoryChecked}
                  unCheckedStyle={styles.categoryUnchecked}
                  pressFunc={() => (cat1
                    ? this.setState({ cat1: null })
                    : this.setState({ cat1: '운동' }))
                  }
                />

                <CheckBox
                  isChecked={cat2}
                  categoryName="공부"
                  checkedStyle={styles.categoryChecked}
                  unCheckedStyle={styles.categoryUnchecked}
                  pressFunc={() => (cat2
                    ? this.setState({ cat2: null })
                    : this.setState({ cat2: '공부' }))
                  }
                />

                <CheckBox
                  isChecked={cat3}
                  categoryName="감정"
                  checkedStyle={styles.categoryChecked}
                  unCheckedStyle={styles.categoryUnchecked}
                  pressFunc={() => (cat3
                    ? this.setState({ cat3: null })
                    : this.setState({ cat3: '감정' }))
                  }
                />

                <CheckBox
                  isChecked={cat4}
                  categoryName="생활습관"
                  checkedStyle={styles.categoryChecked}
                  unCheckedStyle={styles.categoryUnchecked}
                  pressFunc={() => (cat4
                    ? this.setState({ cat4: null })
                    : this.setState({ cat4: '생활습관' }))
                  }
                />

                <CheckBox
                  isChecked={cat5}
                  categoryName="자기계발"
                  checkedStyle={styles.categoryChecked}
                  unCheckedStyle={styles.categoryUnchecked}
                  pressFunc={() => (cat5
                    ? this.setState({ cat5: null })
                    : this.setState({ cat5: '자기계발' }))
                  }
                />

                <CheckBox
                  isChecked={cat6}
                  categoryName="기타"
                  checkedStyle={styles.categoryChecked}
                  unCheckedStyle={styles.categoryUnchecked}
                  pressFunc={() => (cat6
                    ? this.setState({ cat6: null })
                    : this.setState({ cat6: '기타' }))
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.signUpBtn}
              onPress={() => this.signUp(
                ID,
                password,
                password2,
                male,
                female,
                cat1,
                cat2,
                cat3,
                cat4,
                cat5,
                cat6,
                ableID,
                age,
                ableNickname,
                nickname,
                token,
              )
              }
              disabled={ableID ? false : true}
            >
              <Text>회원 가입</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 30,
  },
  signUpContainer: {
    height: (height * 6) / 7,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  goBackBtn: {
    marginLeft: 10,
    marginTop: 20,
  },
  lineContainer: {
    width: width - 20,
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
  },
  idCheckResult: {
    width: 200,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
  },
  lineTextContainer: {
    width: 55,
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
  ageContainer: {
    width: width - 20,
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },
  pickerContainer: {
    width: width - 20,
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },
  sexContainer: {
    width: width - 20,
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
  },
  sexUnchecked: {
    width: 100,
    height: 45,
    backgroundColor: '#F2F2F2',
    marginLeft: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sexChecked: {
    width: 100,
    height: 45,
    backgroundColor: '#BDBDBD',
    marginLeft: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: width - 100,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    marginBottom: 5,
    marginLeft: 5,
  },
  passwordInputContainer: {
    width: width - 100,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    marginBottom: 5,
    marginLeft: 5,
  },
  checkBtn: {
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 65,
    backgroundColor: '#00FF80',
    borderRadius: 10,
  },
  input: {
    width: width - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 20,
  },
  categoryContainer: {
    width: width - 20,
    height: height / 5,
    flexDirection: 'row',
  },
  categoriesContainer: {
    width: width - 100,
    height: height / 5,
    marginLeft: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryUnchecked: {
    width: 80,
    height: 45,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  categoryChecked: {
    width: 80,
    height: 45,
    backgroundColor: '#BDBDBD',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  signUpBtn: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#00FF80',
    marginTop: 1,
  },
});
