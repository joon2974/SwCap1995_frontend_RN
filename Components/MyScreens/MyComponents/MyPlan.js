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
import {
  Feather, MaterialIcons, AntDesign, FontAwesome5, FontAwesome,
} from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default class MyPlan extends Component {
  goToCertifyPage = () => {
    if (this.props.today_auth === false) {
      this.props.faceAuthentication(this.props.planId, 
        this.props.certifyMethod,
        this.props.picturetime);
    } else {
      alert('이미 일일 인증을 했습니다!');
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
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: this.props.url,
              }}
              style={styles.photoStyle}
                />
          </View>
          <View style={{
            justifyContent: 'space-evenly', height: 200,
          }}> 
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="access-time" size={24} color="black" />
              <Text style={styles.textstyle}>
                {this.props.picturetime}
                :00   
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name="piechart" size={20} color="black" />
              <Text style={styles.textstyle}>0.0%</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {this.props.nickname && <FontAwesome5 name="user-friends" size={18} color="black" />}
              <Text style={{ marginLeft: 5, fontSize: 14 }}>{this.props.nickname}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {(this.props.status === 'waiting') && (
              <>
                <FontAwesome name="pause-circle" size={20} color="black" /> 
               
                <Text style={{ marginLeft: 5, fontSize: 18 }}>대기 중</Text>
              </>
              )}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {(this.props.certifyMethod === 0 || this.props.certifyMethod === 1) && (
              <TouchableOpacity 
                style={{ flexDirection: 'row' }}
                onPress={() => this.goToCertifyPage()}
              >
                <FontAwesome name="camera" size={18} color="black" /> 
                <Text style={{ marginLeft: 5, fontSize: 14 }}>인증하기</Text>
              </TouchableOpacity>
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
    fontSize: 18, paddingLeft: 10, paddingRight: 10,
  },
  planInfoContainer: {
    flexDirection: 'row',
  },
});
