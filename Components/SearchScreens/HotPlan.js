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

const { width, height } = Dimensions.get('window');

export default class HotPlan extends Component {
    state = {
      data: [],
      nowPage: 1,
      moreData: 0,
    }

    componentDidMount() {
      this.getData();
    }
 
    getData = () => {
      if (this.state.moreData === 0) {
        const url = 'http://49.50.172.58:3000/plans/filter_age?age=' + this.props.route.params.selectedRecommend + '&limit=10&page=' + this.state.nowPage;
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
          <ImageBackground source={require('../../imgs/back8.png')} style={{ width: width }}>
  
            <FlatList 
              style={{ marginTop: 30, width: width }}
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
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
