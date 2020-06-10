/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { CardFive } from './Cards';


// eslint-disable-next-line no-unused-vars
const { width, height } = Dimensions.get('window');

export default class HotPlan extends Component {
    state = {
      data: [],
      nowPage: 1,
      moreData: 0,
      // nowRecommended: this.props.route.params,  이거 마지막으로 api연동 해줘야함
    }

    componentDidMount() {
      this.getData();
    }
 
    getData = () => {
      if (this.state.moreData === 0) {
        const url = 'http://49.50.172.58:3000/plans?limit=10&page=' + this.state.nowPage;
        fetch(url)
          .then((r) => r.json())
          .then((data) => {
            this.setState({ 
              data: this.state.data.concat(data.plans),
              nowPage: this.state.nowPage + 1,
            });
            if (data.plans.length === 0) {
              this.setState({ moreData: 1 });
            }
          });
      }
    }
  
    handleLoadMore = () => {
      this.getData();
    }
  
    renderItem = ({ item }) => (
      <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('플랜 상세 정보', { item: item })}>
        <CardFive
          title={item.title}
          subTitle={item.category}
          image={{
            uri: item.image_url,
          }}
        />
      </TouchableOpacity>
    );

    render() {
      return (
 
        <View style={styles.container}>
          <ImageBackground source={require('./back8.png')} style={{ width: width }}>
  
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
