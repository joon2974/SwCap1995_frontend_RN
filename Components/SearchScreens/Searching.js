import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
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
          if (data.plans.length === 0) {
            this.setState({ searchStatus: 2 });
          } else {
            this.setState({ searchStatus: 1 });
          }
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
          if (data.plans.length === 0) {
            this.setState({ searchStatus: 2 });
          } else {
            this.setState({ searchStatus: 1 });
          }
        });    
      
      this.setState({ searchStatus: 1 });
    }
  }

  handleLoadMore = () => {
    this.getData();
  }

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
    let showSearched = null;
    if (this.state.searchStatus === 0) {
      showSearched = (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            {'\n\n검색 gogo'}
          </Text>        
        </View>
      );
    } else if (this.state.searchStatus === 1) {
      showSearched = (
        <FlatList 
          style={{ marginTop: 10, width: width }}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
          ref={(ref) => { this.flatList = ref; }}
    />
      );
    } else if (this.state.searchStatus === 2) {
      showSearched = (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            {'\n\n검색한 결과가 존재하지 않습니다.'}
          </Text>        
        </View>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        
          <View style={styles.searchContainer}>
          
            <View style={styles.searchBar}>
              <Input
                placeholder="검색을 입력해주세요"
                onChangeText={(changedSearch) => {
                  this.updateSearch(changedSearch);
                }}
                onSubmitEditing={() => {
                  this.sendSearch();
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
            <ImageBackground source={require('../../imgs/backReverse8.png')} style={{ width: width }}>
              {showSearched}   
            </ImageBackground>
          </View>
        </View>

      </TouchableWithoutFeedback>
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
