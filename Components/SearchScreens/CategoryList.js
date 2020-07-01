/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import SmallCate from './TabList/SmallCate';

const { width } = Dimensions.get('window');

export default class CategoryList extends Component {
    state = {
      // selectedAllCate: '',      
      data: [],
    }

    async componentDidMount() {
      this.setParams();
      this.getData();
      // this.getDataTest();
    }

    setParams = () => {
      // this.setState({ selectedAllCate: this.props.route.params.selectedAllCate });
    }

    async getData() {
      const url = 'http://49.50.172.58:3000/detailedCategories';
      await fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.setState({ 
            data: this.state.data.concat(data.data.detailedCategoryGet),
          });
        });
    }

    handleLoadMore = () => {
      this.getData();
    }
  
    renderItem = ({ item }) => (
      <SmallCate 
        item={item}
        explore={() => this.props.navigation.navigate('플랜 목록', { detailedCategory: item.detailedCategory })} />    
    );

    render() {
      return (
 
        <View style={styles.container}>
          <ImageBackground source={require('../../imgs/backReverse8.png')} style={{ width: width }}>
  
            <FlatList 
              style={{ marginTop: 30, width: width }}
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}     
              
            />
          </ImageBackground>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});
