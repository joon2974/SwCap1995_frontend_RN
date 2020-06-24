import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default class DailyCertifyGalary extends Component {
  state = {
    image: null,
    comment: '',
  };

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('권한이 없으면 사진 선택을 할 수 없어요ㅠ');
    }
    this.pickImage();
  };

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
    const { image, comment } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>선택된 이미지</Text>
          {image && (
            <ImageModal
              source={{ uri: image }}
              style={{ width: width - 40, height: (width - 40) * 1.3, marginLeft: 20 }}
            />
          )}
          <TextInput 
            value={comment}
            onChangeText={(text) => this.setState({ comment: text })}
            multiline
            numberOfLines={4}
            placeholder="일일 인증 소감을 입력해 주세요"
            style={{
              height: 200, width: width - 40, borderColor: 'gray', borderWidth: 0.2, marginTop: 10, borderRadius: 10, paddingLeft: 5,
            }}
          />
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => this.sendImage(image, comment)}
          >
            <Text>이 사진으로 일일 인증하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 10,
  },
});
