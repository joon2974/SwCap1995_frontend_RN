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

export default class NormalPlanList extends Component {
  render() {
    return (
      <View style={styles.containerBackground}>
        <TouchableOpacity 
          style={styles.container}
          onPress={this.props.explore}
      >
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} 
            style={styles.imageStyle}
        />
          <View>
            <Text style={{ marginLeft: 20, marginBottom: 20, fontSize: 20 }}>
              플랜 타이틀
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              작성일 ~~~~~~
            </Text>
        
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBackground: {
    width: width * 0.98,
    height: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    marginBottom: 20,
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

  container: {
    width: width * 0.94,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  
  imageStyle: {
    width: width * 0.46,
    height: height * 0.23,
    borderRadius: 10,
  },
});
