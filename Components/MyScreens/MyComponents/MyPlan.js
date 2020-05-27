import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class MyPlan extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
          <TouchableOpacity
            onPress={this.props.btnFunc}
            style={styles.btnContainer}>
            <Text>더보기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.photoContainer}>
          <Image
            source={{
              uri: this.props.url,
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
    borderRadius: 25,
    marginRight: 20,
    borderWidth: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
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
  btnContainer: {
    width: 40,
    height: 20,
    backgroundColor: '#00FF80',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
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
