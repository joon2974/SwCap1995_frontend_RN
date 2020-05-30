/* eslint-disable global-require */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  Button,
} from 'react-native';
import { Input } from 'react-native-elements';
import { CardFive } from './Cards';

const { height, width } = Dimensions.get('window');

export default class Searching extends Component {
  state = {
    search: '',
    searchStatus: 0,

    nowPage: 1,
    data: [],
    moreData: 0,
  };

  updateSearch = (changedSearch) => {
    this.setState({ search: changedSearch });
  };

  sendSearch = () => {
    if (this.state.searchStatus === 1) {
      this.state.nowPage = 1;
      this.state.moreData = 0;

      const url = 'http://49.50.172.58:3000/plans/search?query=' + this.state.search + '&limit=10&page=' + this.state.nowPage;
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.setState({ 
            data: data.plans,
            nowPage: this.state.nowPage + 1,
          });
        });
      this.flatList.scrollToOffset({ animated: true, offset: 0 });  
    } else {
      const url = 'http://49.50.172.58:3000/plans/search?query=' + this.state.search + '&limit=10&page=' + this.state.nowPage;
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.setState({ 
            data: this.state.data.concat(data.plans),
            nowPage: this.state.nowPage + 1,
          });
        });    
      
      this.setState({ searchStatus: 1 });
    }
  }

  handleLoadMore = () => {
    this.getData();
  }


  //  const url = 'http://49.50.172.58:3000/plans/search?query='+this.state.search + '&limit=10&page=' + this.state.nowPage;

  getData = () => {
    if (this.state.moreData === 0) {
      const url = 'http://49.50.172.58:3000/plans/search?query=' + this.state.search + '&limit=10&page=' + this.state.nowPage;
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

     
  renderItem = ({ item }) => (
    <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('DetailPlan', { item: item })}>
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
    let showSearched = null;
    if (this.state.searchStatus === 0) {
      showSearched = <View />;
    } else if (this.state.searchStatus === 1) {
      showSearched = (
        <FlatList 
          style={{ marginTop: 10, width: width }}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.id}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
          ref={(ref) => { this.flatList = ref; }}
    />
      );
    }

    return (
      <View style={styles.container}>
        
        <View style={styles.searchContainer}>
          
          <View style={styles.searchBar}>
            <Input
              placeholder="검색을 입력해주세요"
              onChangeText={(changedSearch) => {
                this.updateSearch(changedSearch);
              }}
            />
            <Button
              title="검색"
              type="solid"
              color="#FD8A69"
              onPress={() => {
                this.sendSearch();
              }}
            />
          </View>
        </View>

        <View style={styles.searchedList}>
          <ImageBackground source={require('./backReverse8.png')} style={{ width: width }}>
            {showSearched}   
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  
  },
  searchContainer: {
    marginTop: 20,
    paddingTop: 5,
    width: width * 0.97,
    height: height / 14,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#FD8A69',
  },

  searchBar: {
    width: width * 0.84,
    flexDirection: 'row',
  },
  
  searchedList: {
    flex: 1,
  },
  
});
