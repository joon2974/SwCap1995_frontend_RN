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

export default class SearchedList extends Component {
    state={
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
  
    render() {
      return (
        <View style={styles.container}>
          {
            // eslint-disable-next-line no-unused-vars
            this.state.array.map((data, index) => (
              <TouchableOpacity 
                style={styles.searchingList}
                onPress={this.props.explore}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} 
                    style={styles.imageStyle}
                    />
                  <Text>
                    플랜 이름
                  </Text>
                  
                </View>
              </TouchableOpacity>
            ))
      
  }
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  
  
  searchingList: {
    width: width * 0.45,
    height: height / 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 8,
    marginBottom: 6,
    borderRadius: 10,
    flexDirection: 'row',


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
    width: width * 0.4,
    height: height * 0.15,
    borderRadius: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
});
