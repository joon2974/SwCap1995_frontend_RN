import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, 
} from 'react-native';

export default class DaileyAuthentication extends Component {
  render() {
    const pic = {
      // uri : search
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    };

    return (
          
      <View style={styles.container}>
                 

        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }} 
                    // decelerationRate={0}
                    // snapToInterval={width - 60}
                    // snapToAlignment={"center"}
                    // pagingEnabled={true}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>

          <Image source={pic} style={styles.daileyPicture} />
                
          <View>
            <Text style={styles.recommendTitle}>
              일일 인증 타이틀
            </Text>
            <Text style={styles.recommendSubTitle}>
              여기에 일일 인증에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 일일 인증에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 일일 인증에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 일일 인증에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
            </Text>
          </View>
                
          
          <View>
            <Text style={styles.recommendTitle}>
              인증 방법에 대해... 위와 비교하기 위한 리마인드용
            </Text>
            <Text style={styles.recommendSubTitle}>
              RULE 1 : ~~~~~~~~~
              {'\n'}
              RULE 2 : ~~~~~~~~~
              {'\n'}
              RULE 3 : ~~~~~~~~~
              {'\n'}
              RULE 4 : ~~~~~~~~~
              {'\n'}
            </Text>
          </View>
      
          <View>
            <Text style={styles.recommendTitle}>
              이날 인증에 감시참여한 감시자들 리스트
            </Text>
            <Text style={styles.recommendSubTitle}>
              감감감감 : ~~~~~~~~~
              {'\n'}
              시시시시 : ~~~~~~~~~
              {'\n'}
              자자자자 : ~~~~~~~~~
              {'\n'}
              들들들들 : ~~~~~~~~~
              {'\n'}
            </Text>
          </View>

               
        </ScrollView>

      </View>

    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },


  recommendTitle: {
    fontWeight: 'bold', 
    paddingHorizontal: 10, 
    paddingVertical: 20, 
    fontSize: 24,
  },
  recommendSubTitle: {
    paddingHorizontal: 10, 
    paddingVertical: 10, 
    fontSize: 16,
  },

  categoryUnitList: {
    flexDirection: 'row',
    padding: 5,
  },
  daileyPicture: {
    margin: 20,
    width: 360,
    height: 200,
  },
  calendar: {
    margin: 10,
    height: 300,
    width: 250,
  },
});
