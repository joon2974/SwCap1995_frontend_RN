import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class SmallCate extends Component {
  render() {

    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.explore}
      >
        <View style = {{alignItems:'center'}}>
            <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} 
            style={styles.imageStyle}
            />
          <Text>
            이름
          </Text>
          
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.38,
    height: height / 5,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    margin: 2,
    marginBottom:6,
    borderRadius: 10,
    flexDirection:'row',


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
  
  imageStyle: {
    width: width * 0.25,
    height: height * 0.14,
    borderRadius: 10,
    marginBottom: 5,
    marginLeft:5,
  },
});
