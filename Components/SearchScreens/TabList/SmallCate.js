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
          image={{
            uri:
                'https://i.pinimg.com/originals/c4/9b/f9/c49bf95e4e02873610daf3bfda54e44a.jpg',
          }}
          title={this.props.plans.id}
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
