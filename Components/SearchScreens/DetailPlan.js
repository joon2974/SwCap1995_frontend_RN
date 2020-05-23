import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView, 
} from 'react-native';

export default class DetailPlan extends Component {
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

          <Image source={pic} style={styles.planPciture} />
                
          <View>
            <Text style={styles.recommendTitle}>
              플랜 제목
            </Text>
            <Text style={styles.recommendSubTitle}>
              여기에 플랜에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 플랜에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 플랜에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 플랜에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
            </Text>
          </View>
                
          <View>
            <Text style={styles.recommendTitle}>
              참여중인 감시자들
            </Text>
            <Text style={styles.recommendSubTitle}>
              여기에 감시자에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 감시자에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 감시자에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
              여기에 감시자에 대한 간략한 정보 기술 약 3,4줄.
              {'\n'}
            </Text>
          </View>
                
          <View>
            <Text style={styles.recommendTitle}>
              인증 방법에 대해...
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
              지난 경과들...
            </Text>
            <Text style={styles.recommendSubTitle}>
              지난 인증 결과에 대해 궁금하시다면 아래의 달력을 클릭해 보세요
              {'\n'}
            </Text>
          </View>

          <TouchableOpacity style={styles.calendar} onPress={() => this.props.navigation.navigate('Calendar')}>
            <Image source={pic} style={styles.calendar} />
          </TouchableOpacity>

        </ScrollView>

      </View>

    );
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  planPciture: {
    margin: 20,
    width: 360,
    height: 200,
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
  category: {
    margin: 5,
    width: 180,
    height: 150,
  },
  calendar: {
    margin: 10,
    width: 360,
    height: 200,
  },
   
});
