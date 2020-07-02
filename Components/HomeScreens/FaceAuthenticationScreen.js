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
  Modal,
  Alert,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { kairosConfig } from '../../kairosConfig';

const { height, width } = Dimensions.get('window');
const BASE_URL = 'https://api.kairos.com/';
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  app_id: kairosConfig.app_id,
  app_key: kairosConfig.app_key,
};

export default class FaceAuthenticationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.front,
      isPhotoTaken: false,
      imageUri: null,
      imageBase64: null,
      modalVisible: false,
      isFaceDetected: false,
      disable: false,
      postDisable: false,
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

  switchCameraType = () => {
    const { cameraType } = this.state;

    if (cameraType === Camera.Constants.Type.front) {
      this.setState({ cameraType: Camera.Constants.Type.back });
    } else {
      this.setState({ cameraType: Camera.Constants.Type.front });
    }
  }

  takePhoto = async () => {
    this.setState({ disable: true });
    const { isFaceDetected } = this.state;
    if (isFaceDetected) {
      try {
        if (this.cameraRef.current) {
          const image = await this.cameraRef.current.takePictureAsync({
            quality: 1,
            base64: true,
          });
  
          if (image) {
            this.setState({ imageUri: image.uri, imageBase64: image.base64 });
            Alert.alert('', '사진을 찍었습니다!');
            this.setState({ isPhotoTaken: true });
          }
        }
      } catch (error) {
        alert(error);
      }
    } else {
      Alert.alert('', '얼굴이 잘 나오게 찍어주세요!');
    }
  }

  // recognize = async (base64) => {
  //   this.setState({ modalVisible: true });
  //   const rawResponse = await fetch(`${BASE_URL}recognize`, {
  //     method: 'POST',
  //     headers: HEADERS,
  //     body: JSON.stringify({
  //       image: base64,
  //       gallery_name: 'MyGallery',
  //     }),
  //   });
  //   const content = await rawResponse.json();
  //   const highestPercentId = content.images[0].transaction.face_id;
  //   if (this.props.route.params.userFaceId === highestPercentId) {
  //     this.setState({ modalVisible: false });
  //     if (this.props.route.params.certifyMethod === 0) {
  //       Alert.alert('', '본인 인증이 완료되었습니다!');
  //       this.props.route.params.galaryCertify(this.props.route.params.planID);
  //     } else {
  //       Alert.alert('', '본인 인증이 완료되었습니다!');
  //       this.props.route.params.cameraCertify(this.props.route.params.planID);
  //     }
  //   } else {
  //     this.setState({ modalVisible: false });
  //     Alert.alert('', '얼굴이 일치하지 않습니다!');
  //     this.props.navigation.goBack();
  //   }
  // };

  recognize = async (base64) => {
    this.setState({ modalVisible: true });
    if (this.props.route.params.certifyMethod === 0) {
      Alert.alert('', '본인 인증이 완료되었습니다!');
      this.props.route.params.galaryCertify(this.props.route.params.planID);
      this.setState({ modalVisible: false });
    } else {
      Alert.alert('', '본인 인증이 완료되었습니다!');
      this.props.route.params.cameraCertify(this.props.route.params.planID);
      this.setState({ modalVisible: false });
    }
  };

  faceDetected = (faces) => {
    if (faces.faces.length !== 0) {
      this.setState({ isFaceDetected: true });
    }
  }

  render() {
    const {
      hasPermission,
      cameraType,
      isPhotoTaken,
      imageUri,
      imageBase64,
      modalVisible,
      disable,
      postDisable,
    } = this.state;

    if (hasPermission === true) {
      if (isPhotoTaken) {
        return (
          <View style={styles.container}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <ActivityIndicator size="large" />
                <Text>본인 확인 중입니다...</Text>
              </View>
            </Modal>
            <Text>찍은 사진</Text>
            <Image 
              source={{ uri: imageUri }} 
              style={{ width: width - 40, height: (width - 40) * 1.3 }} 
            />
            <TouchableOpacity 
              style={styles.uploadBtn}
              onPress={() => {
                this.setState({ postDisable: true });
                this.recognize(imageBase64);
              }}
              disabled={postDisable}
            >
              <Text>이 사진으로 본인 인증하기</Text>
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
                onFacesDetected={this.faceDetected}
              />
            </View>
            <View style={styles.shutterBtnContainer}>
              <TouchableOpacity
                onPress={this.takePhoto}
                disabled={disable}
              >
                <Image 
                  source={{ uri: 'https://kr.object.ncloudstorage.com/swcap1995/001-camera.png' }} 
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
    ...Platform.select({
      ios: {
        height: (width - 40) * 1.25,
      },
      android: {
        height: (width - 40) * 1.3,
      },
    }),
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
    width: width * 0.6,
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
        marginBottom: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
