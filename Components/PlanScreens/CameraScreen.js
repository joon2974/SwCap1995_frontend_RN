import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const ALBUM_NAME = 'PLAN A';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.front,
      isPhotoTaken: false,
      imageUri: null,
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
    try {
      if (this.cameraRef.current) {
        const { uri } = await this.cameraRef.current.takePictureAsync({
          quality: 1,
        });

        if (uri) {
          this.setState({ imageUri: uri });
          alert('사진을 찍었습니다!');
          this.savePhoto(uri);
          this.setState({ isPhotoTaken: true });
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  savePhoto = async (uri) => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);

        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id);
        }
      } else {
        this.setState({ hasPermission: false });
      }
    } catch (error) {
      console.log(error);
    }
  }

  sendImage = (uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('photo', { uri: uri, name: `photo.${fileType}`, type: 'image/jpeg' });
    formData.append('user_id', this.props.route.params.userID);
    axios.post('http://49.50.172.58:3000/users/face_detection', formData, {
      header: { 
        'content-type': 'multipart/form-data',
      },
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        this.props.route.params.completeFunc();
        this.props.navigation.popToTop();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const {
      hasPermission,
      cameraType,
      isPhotoTaken,
      imageUri,
    } = this.state;

    if (hasPermission === true) {
      if (isPhotoTaken) {
        return (
          <View style={styles.container}>
            <Text>찍은 사진</Text>
            <Image 
              source={{ uri: imageUri }} 
              style={{ width: width - 20, height: width - 20 }} 
            />
            <TouchableOpacity 
              style={styles.uploadBtn}
              onPress={() => this.sendImage(imageUri)}  
            >
              <Text>이 사진으로 얼굴 등록하기</Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={this.switchCameraType}
              >
                <Ionicons 
                  name="ios-reverse-camera"
                  size={40}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
              <Camera 
                style={styles.cameraStyle}
                type={cameraType}
                ref={this.cameraRef}
              />
            </View>
            <View style={styles.shutterBtnContainer}>
              <TouchableOpacity
                onPress={this.takePhoto}
              >
                <Ionicons 
                  name="ios-add-circle-outline"
                  size={40}
                  color="black"
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
    height: width - 40,
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
    marginBottom: 5,
  },
  shutterBtnContainer: {
    width: width,
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
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
});
