import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, 
} from 'react-native';

export default class CategoryList extends Component {
  render() {
    const pic = {
      // uri : search
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
    };

    return (
          
      <View style={styles.container}>
        <View>
          <Text style={styles.recommendTitle}>
            클릭된 분야의 카테고리들 리스트
          </Text>
          <Text style={styles.recommendSubTitle}>
            클릭된 분야의 카테고리 리스트가 아래에 펼쳐짐~~~~~~~~
            ex) 건강/운동 분야로 들어왔다면 조깅, 헬스, 물마시기 등 이런것들이 아래에 나열
          </Text>
        </View>


        <ScrollView>

       
          <View style={styles.categoryUnitList}>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryUnitList}>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryUnitList}>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryUnitList}>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryUnitList}>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.category} onPress={() => this.props.navigation.navigate('DetailPlan')}>
              <Image source={pic} style={styles.category} />
            </TouchableOpacity>
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
  category: {
    margin: 5,
    width: 180,
    height: 150,
  },
});
