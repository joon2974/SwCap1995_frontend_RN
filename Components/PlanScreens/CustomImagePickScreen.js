import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageModal from 'react-native-image-modal';

const { width } = Dimensions.get('window');

export default class CustomImagePickScreen extends Component {
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
        this.props.navigation.goBack();
      }

      console.log('image pick result', result);
    } catch (error) {
      console.log(error);
    }
  }

  sendImage = (uri) => {
    this.props.route.params.completeFunc(uri);
    this.props.navigation.navigate('플랜 만들기: 1단계(커스텀)');
  }

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <Text>선택된 이미지</Text>
        { image && (
        <ImageModal
          source={{ uri: image }} 
          style={{ width: width - 40, height: (width - 40) * 1.3, marginLeft: 20 }} />
        )}
        <TouchableOpacity 
          style={styles.uploadBtn}
          onPress={() => this.sendImage(image)}  
        >
          <Text>이 사진을 인증사진으로 사용하기</Text>
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
