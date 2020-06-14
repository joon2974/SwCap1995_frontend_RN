import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const BASE_URL = 'https://api.kairos.com/';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  app_id: '79e9aa10',
  app_key: '2bcefdffa750bc7defa2b7278e776de2',
};

export default class CameraTestScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.front,
      isPhotoTaken: false,
      imageUri: null,
      imageBase64: null,
    };

    this.cameraRef = React.createRef();
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === 'granted') {
      this.setState({ hasPermission: true });
    } else {
      this.setState({ hasPermission: false });
    }
  };

  enroll = async (userId, base64) => {
    console.log('유저 아이디', userId);
    const rawResponse = await fetch(`${BASE_URL}enroll`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        image: base64,
        subject_id: `MySocial_${userId}`,
        gallery_name: 'MyGallery',
      }),
    });
    const content = await rawResponse.json();
    console.log('인롤 결과', content);
  };

  recognize = async (base64) => {
    console.log('레코그나이즈 시작');
    const rawResponse = await fetch(`${BASE_URL}recognize`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        image: base64,
        gallery_name: 'MyGallery',
      }),
    });
    const content = await rawResponse.json();
    console.log('레코그 나이즈', content);
  };

  switchCameraType = () => {
    const { cameraType } = this.state;

    if (cameraType === Camera.Constants.Type.front) {
      this.setState({ cameraType: Camera.Constants.Type.back });
    } else {
      this.setState({ cameraType: Camera.Constants.Type.front });
    }
  };

  takePhoto = async () => {
    try {
      if (this.cameraRef.current) {
        const image = await this.cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });

        if (image) {
          this.setState({ imageUri: image.uri });
          this.setState({ imageBase64: image.base64 });
          alert('사진을 찍었습니다!');
          this.setState({ isPhotoTaken: true });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  sendImage = (uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('photo', {
      uri: uri,
      name: `photo.${fileType}`,
      type: 'image/jpeg',
    });
    formData.append('user_id', this.props.route.params.userID);
    axios
      .post('http://49.50.172.58:3000/users/face_detection', formData, {
        header: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          this.props.route.params.completeFunc();
          this.props.navigation.popToTop();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onFacesDetected = (faces) => {
    console.log(faces[0]);
  };

  render() {
    const {
      hasPermission, cameraType, isPhotoTaken, imageUri, imageBase64,
    } = this.state;

    if (hasPermission === true) {
      if (isPhotoTaken) {
        return (
          <View style={styles.container}>
            <Text>찍은 사진</Text>
            <Image
              source={{ uri: imageUri }}
              style={{ width: width - 40, height: (width - 40) * 1.3 }}
            />
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => this.enroll(this.props.route.params.userID, imageBase64)}
            >
              <Text>얼굴 등록</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => this.recognize(imageBase64)}
            >
              <Text>유사도 확인</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={this.switchCameraType}
                style={styles.rotateBtn}
              >
                <Text>카메라 전환</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
              <Camera
                style={styles.cameraStyle}
                type={cameraType}
                ref={this.cameraRef}
                onFacesDetected={this.onFacesDetected}
                // faceDetectionClassifications="all"
                faceDetectorSettings={{
                  detectLandmarks: FaceDetector.Constants.Landmarks.none,
                  mode: FaceDetector.Constants.Mode.fast,
                  runClassifications: FaceDetector.Constants.Mode.none,
                }}
              />
            </View>
            <View style={styles.shutterBtnContainer}>
              <TouchableOpacity onPress={this.takePhoto}>
                <Image
                  source={{
                    uri:
                      'https://kr.object.ncloudstorage.com/swcap1995/001-camera.png',
                  }}
                  style={{ width: 40, height: 40 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    } else if (hasPermission === false) {
      return <Text>Dont have Permission for this App. </Text>;
    } else {
      return <ActivityIndicator />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cameraStyle: {
    width: width - 40,
    height: (width - 40) * 1.3,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cameraContainer: {
    width: width,
    height: height * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: width,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterBtnContainer: {
    width: width,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  uploadBtn: {
    width: width * 0.3,
    height: 40,
    backgroundColor: '#40FF00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  rotateBtn: {
    width: width / 3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC0B0',
    borderRadius: 10,
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
