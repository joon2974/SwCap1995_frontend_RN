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
import { Feather } from '@expo/vector-icons'; 


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
            <Feather name="more-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.photoContainer}>
          <Image
            source={{
              uri: this.props.url,
            }}
            style={styles.photoStyle}
                />
                
          <Text style={{ fontWeight: 'bold', fontSize: 40 }}>
            {this.props.picturetime}
            :00
          </Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: width / 1.8,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    marginRight: 20,
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
    width: width / 2.1,
    height: height / 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
