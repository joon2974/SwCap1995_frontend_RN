import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { CardTwelve } from '../Cards';

const { width, height } = Dimensions.get('window');

export default class SmallCate extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={this.props.explore}
    >   
      
        <CardTwelve
          image={{ uri: this.props.item.image_url }}
          title={this.props.item.detailedCategory}
          subTitle="John Bob"
          viewProgress={true}
          progress={2}

          
          />
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 2.2,
    marginVertical: 10, 
    height: height / 2.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  imageStyle: {
    width: width * 0.25,
    height: height * 0.14,
    borderRadius: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
});
