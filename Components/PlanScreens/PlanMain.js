import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import axios from 'axios';

let currentUser;
let isRegisterdCheck;
const { height, width } = Dimensions.get('window');

export default class PlanMain extends Component {
  state = {
    isFaceRegisterd: false,
  }

  componentDidMount() {
    currentUser = firebase.auth().currentUser;
    if (currentUser != null) {
      const email = currentUser.email;
      this.isFaceRegisterdCheck(email);
    }
  }

  componentWillUnmount() {
    clearTimeout(currentUser);
    clearTimeout(isRegisterdCheck);
  }

  isFaceRegisterdCheck = (eMail) => {
    isRegisterdCheck = axios
      .post('http://49.50.172.58:3000/users/is_face_detection', {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        email: eMail,
      })
      .then((res) => {
        if (res.data.id) {
          console.log('얼굴인식 완료된 유저');
          this.setState({ isFaceRegisterd: true });
          this.forceUpdate();
        } else {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { isFaceRegisterd } = this.state;

    if (isFaceRegisterd) {
      return (
        <View style={styles.container}>
          <Text>플랜 메인</Text>
          <Button title="플랜 생성" onPress={() => this.props.navigation.navigate('MakePlanStep1')} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.InfoContainer}>
            <View style={styles.informTitle}>
              <Text style={{ fontWeight: 'bold', fontSize: 30 }}>얼굴 인증</Text>
            </View>
            <View style={styles.information}>
              <Text>Plan A는 사용자의 대리 인증을 방지하기 위해 본인 인증을 위한 수단으로 얼굴 인증을 사용하고 있습니다.</Text>
              <Text>하단의 두 방법 중 하나의 방법으로 자신의 얼굴을 Plan A에 등록해 주세요.</Text>
            </View>
          </View>
          <View style={styles.BtnContainer}>
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={() => this.props.navigation.navigate('CameraScreen')}
            >
              <Text>카메라로 사진 찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={() => this.props.navigation.navigate('ImagePickScreen')}
            >
              <Text>갤러리에서 사진 가져오기</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
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
  InfoContainer: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
  },
  BtnContainer: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  informTitle: {
    height: height / 4,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  information: {
    height: height / 4,
    width: width - 30,
    justifyContent: 'center',
    marginLeft: 15,
  },
  registerBtn: {
    width: 130,
    height: 130,
    borderRadius: 20,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
