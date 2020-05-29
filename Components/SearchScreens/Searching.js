/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
  };

  updateSearch = (changedSearch) => {
    this.setState({ search: changedSearch });
  };

  sendSearch = () => {
    if (this.state.searchStatus === 1) {
      this.state.nowPage = 1;

      const url = 'http://49.50.172.58:3000/plans?limit=10&page=' + this.state.nowPage;
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          this.setState({ 
            data: data.plans,
            nowPage: this.state.nowPage + 1,
          });
        });
    } else {
      const url = 'http://49.50.172.58:3000/plans?limit=10&page=' + this.state.nowPage;
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

  getData = () => {
    const url = 'http://49.50.172.58:3000/plans?limit=10&page=' + this.state.nowPage;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        this.setState({ 
          data: this.state.data.concat(data.plans),
          nowPage: this.state.nowPage + 1,
        });
      });    
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
          style={{ marginTop: 30, width: width }}
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => item.id}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={1}
    />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          
          <View style={styles.searchBar}>
            <Input
              placeholder="Type Here..."
              onChangeText={(changedSearch) => {
                this.updateSearch(changedSearch);
              }}
            />
            <Button
              title="검색"
              type="solid"
              onPress={() => {
                this.sendSearch();
              }}
            />
          </View>
        </View>

        <View style={styles.container}>
          {showSearched}   
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
    paddingVertical: 10,
  },
  searchContainer: {
    width: width * 0.95,
  },
  searchTitle: {
    marginLeft: 10,
    marginTop: 5,
  },
  searchBar: {
    width: width * 0.84,
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 15,
  },
  scrollContainer: {
    width: width * 1,
  },
  recommendTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 25,
    fontSize: 24,
  },
  recommendSubTitle: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 16,
  },
  moreExplore: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.75,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    height: height * 0.04,
  },
  allCateTitle: {
    fontWeight: 'bold',
    marginHorizontal: 25,
    marginTop: 65,
    fontSize: 24,
  },
  allCateSubTitle: {
    marginHorizontal: 25,
    marginTop: 10,
    fontSize: 16,
  },

  tabButtonContainer: {
    width: width,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },

  planContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  categoryBtnStyle: {
    width: width * 0.17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 1,
  },

  selectedCategoryBtnStyle: {
    width: width * 0.17,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
    borderRadius: 5,
    margin: 1,
  },
});
