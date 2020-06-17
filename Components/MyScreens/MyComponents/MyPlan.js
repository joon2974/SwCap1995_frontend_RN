import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native'; 
import {
  Feather,
} from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default class MyPlan extends Component {
  goToCertifyPage = () => {
    if (this.props.today_auth === false) {
      this.props.faceAuthentication(this.props.planId, 
        this.props.certifyMethod,
        this.props.picturetime,
        this.props.userFaceId);
    } else {
      Alert.alert('', '이미 일일 인증을 했습니다!');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={this.props.status === 'waiting' ? styles.watingtopContainer : styles.completetopContainer}>
          <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
        
          <TouchableOpacity
            onPress={() => this.props.btnFunc(this.props.id)}
            style={styles.btnContainer}>
           
            <Feather name="more-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.planInfoContainer}>
          <TouchableOpacity 
            style={styles.photoContainer} 
            onPress={this.props.faceAuthentication 
              ? this.goToCertifyPage : this.props.moveToWatching}
          >
            <Image
              source={{
                uri: this.props.url,
              }}
              style={styles.photoStyle}
                />
          </TouchableOpacity>
          <View style={{
            justifyContent: 'space-evenly', height: 200,
          }}> 
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textstyle}>
                ⏰
                {' '} 
                {this.props.picturetime}
                :00   
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textstyle}>
                📊
                {' '}
                {(this.props.percent * 100).toFixed(2)}
                %
              </Text>
            </View>
            {this.props.nickname 
              && (
              <View style={{ flexDirection: 'row' }}>
                <Text>
                  🙍 
                  {' '}
                </Text>
                <Text style={{ marginLeft: 5, fontSize: 16 }}>{this.props.nickname}</Text>
              </View>
              )
            }
            <View style={{ flexDirection: 'row' }}>
              {(this.props.status === 'waiting') && (
                <Text style={{ fontSize: 16 }}>⌛ 대기 중</Text>
              )}
            </View>
          </View>
        </View>
         
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: width / 1.6,
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
  watingtopContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F2F2F2',
  },
  completetopContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#64FE2E',
  },
  photoContainer: {
    height: width / 1.6 - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 20,
  },
  photoStyle: {
    width: width * 0.4,
    height: width / 1.6 - 40,
    resizeMode: 'cover',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 16, paddingRight: 10,
  },
  planInfoContainer: {
    flexDirection: 'row',
  },
});
