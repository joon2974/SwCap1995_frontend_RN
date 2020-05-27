import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class MyPlan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text>플랜이름</Text>
          <TouchableOpacity
            onPress={this.props.btnFunc}>
            <Text>+더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.photoContainer}>
          <Image
            source={{
              uri: 'https://ifh.cc/g/BHltgC.jpg',
            }}
            style={styles.photoStyle}
                />
          <Image
            source={{
              uri: 'https://ifh.cc/g/BHltgC.jpg',
            }}
            style={styles.photoStyle}
                />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.75,
    height: width / 2,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    marginRight: 20,
    borderWidth: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  
  photoContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  photoStyle: {

    width: width / 4,
    height: height / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
