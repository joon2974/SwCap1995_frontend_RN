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

const { width } = Dimensions.get('window');

export default class PlanList extends Component {
    state = {
      data: [],
      nowPage: 1,
      moreData: 0,
      detailedCategory: null,
      // nowRecommended: this.props.route.params,  이거 마지막으로 api연동 해줘야함
    }

    async componentDidMount() {
      // this.getData();
      await this.setState({ detailedCategory: this.props.route.params.detailedCategory });
      this.getData();
    }

    
  getData = () => {
    if (this.state.moreData === 0) {
      const url = 'http://49.50.172.58:3000/plans/search?query=' + this.state.detailedCategory + '&limit=10&page=' + this.state.nowPage;
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
          <ImageBackground source={require('../../imgs/backReverse8.png')} style={{ width: width }}>

            <FlatList 
              style={{ marginTop: 10, width: width }}
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={1}
              ref={(ref) => { this.flatList = ref; }}
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
