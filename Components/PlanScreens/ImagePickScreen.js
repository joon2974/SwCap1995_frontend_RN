import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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
      }

      console.log('image pick result', result);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <Text>선택된 이미지</Text>
        { image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
});
