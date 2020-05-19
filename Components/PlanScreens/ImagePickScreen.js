import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default class ImagePickScreen extends Component {
  state = {
    image: null,
  }

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('권한이 없으면 사진 선택을 할 수 없어요ㅠ');
    }
    this.pickImage();
  }

  pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      } else {
        this.props.navigation.popToTop();
      }

      console.log('image pick result', result);
    } catch (error) {
      console.log(error);
    }
  }

  sendImage = (uri) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('photo', { uri: uri, name: `photo.${fileType}`, type: 'image/jpeg' });

    axios.post('http://49.50.172.58:3000/test/upload2', formData, {
      header: { 
        'content-type': 'multipart/form-data',
      },
    }).then((res) => {
      console.log(res.status);
      this.props.route.params.completeFunc();
      this.props.navigation.popToTop();
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <Text>선택된 이미지</Text>
        { image && (
        <Image 
          source={{ uri: image }} 
          style={{ width: width - 20, height: width - 20 }} />
        )}
        <TouchableOpacity 
          style={styles.uploadBtn}
          onPress={() => this.sendImage(image)}  
        >
          <Text>이 사진으로 얼굴 등록하기</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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