/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
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

// eslint-disable-next-line no-unused-vars
const { width, height } = Dimensions.get('window');

export default class CategoryList extends Component {
    state = {
    
      // selectedAllCate: '',
      
      data: [],
      page: 1, 
      flag: 1,
    }


    componentDidMount() {
      this.setParams();
      this.getData();
    }

    setParams = () => {
      // this.setState({ selectedAllCate: this.props.route.params.selectedAllCate });
    }

    getData = () => {
      const url = 'http://49.50.172.58:3000/plans?limit=10&page=' + this.state.page;
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.setState({ 
            data: this.state.data.concat(data.plans),
            page: this.state.page + 1,
          });
        });      
    }
    

    handleLoadMore = () => {
      this.getData();
    }
  
       
    renderItem = ({ item }) => (

      this.state.flag ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <SmallCate 
            item={item}
            explore={() => this.props.navigation.navigate('PlanList')} />
          <SmallCate 
            item={item}
            explore={() => this.props.navigation.navigate('PlanList')} />

        </View>
      ) : <SmallCate explore={() => this.props.navigation.navigate('PlanList')} />

      
    );


    render() {
      return (
 
        <View style={styles.container}>
          <ImageBackground source={require('./back6.png')} style={{ width: width }}>
  
            <FlatList 
              style={{ marginTop: 30, width: width }}
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item.id}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={1}
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
