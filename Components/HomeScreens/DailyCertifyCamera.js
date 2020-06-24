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
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import ImageModal from 'react-native-image-modal';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const ALBUM_NAME = 'PLAN A';

export default class DayCertifyCamera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.front,
      isPhotoTaken: false,
      imageUri: null,
      comment: '',
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
  };

  takePhoto = async () => {
    try {
      if (this.cameraRef.current) {
        const { uri } = await this.cameraRef.current.takePictureAsync({
          quality: 1,
        });

        if (uri) {
          this.setState({ imageUri: uri });
          Alert.alert('', '사진을 찍었습니다!');
          this.savePhoto(uri);
          this.setState({ isPhotoTaken: true });
        }
      }
    } catch (error) {
      alert(error);
    }
  };

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
  };

  sendImage = (uri, comment) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('photo', {
      uri: uri,
      name: `photo.${fileType}`,
      type: 'image/jpeg',
    });
    formData.append('user_id', this.props.route.params.userID);
    formData.append('plan_id', this.props.route.params.planID);
    formData.append('comment', comment);
    formData.append('status', 'undone');

    axios
      .post('http://49.50.172.58:3000/daily_authentications', formData, {
        header: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.route.params.returnFunc();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const {
      hasPermission, cameraType, isPhotoTaken, imageUri, comment,
    } = this.state;

    if (hasPermission === true) {
      if (isPhotoTaken) {
        return (
          <ScrollView>
            <View style={styles.container}>
              <Text>찍은 사진</Text>
              <ImageModal
                source={{ uri: imageUri }}
                style={{ width: width - 40, height: (width - 40) * 1.3, marginLeft: 20 }}
              />
              <TextInput
                value={comment}
                onChangeText={(text) => this.setState({ comment: text })}
                multiline
                numberOfLines={4}
                placeholder="일일 인증 소감을 입력해 주세요"
                style={{
                  height: 200,
                  width: width - 40,
                  borderColor: 'gray',
                  borderWidth: 0.2,
                  marginTop: 10,
                  borderRadius: 10,
                  paddingLeft: 5,
                }}
              />
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={() => this.sendImage(imageUri, comment)}
              >
                <Text>이 사진으로 일일 인증하기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    width: width * 0.6,
    height: 40,
    backgroundColor: '#40FF00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
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
