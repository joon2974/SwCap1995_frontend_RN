import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { SimpleLineIcons} from '@expo/vector-icons';

//const { width } = Dimensions.get('window');

export default class Searchscreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      categoryData: [
        {name: 'rec1'},
        {name: 'rec2'},
        {name: 'rec3'},
        {name: 'rec4'},
        {name: 'rec5'},
      ]
    }
  }

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };


  render() {
    const { search } = this.state;

    return (

      <View style = {styles.container}>

        <View> 
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>


        <View>
          <Text style = {{fontWeight: 'bold', paddingHorizontal:10, paddingVertical:5, fontSize:18}}>Today Recommended</Text>
          
          <FlatList 
            horizontal
            data = {this.state.categoryData}
            renderItem = {({item, index}) => 
              <View style = {{padding: 5}}>
                <View style = {{backgroundColor: 'white', borderWidth: 5, borderColor: '#626262', borderRadius:20, height: 50, width: 70}}>
                    <Text style = {{paddingHorizontal:14, paddingVertical:8, fontWeight:'bold'}}>{item.name}</Text>
                </View>
              </View>}
            //keyExtractor ={(item,index) => index.toString()} //warning 잡기
          />
        </View>


        <ScrollView
            ref={(scrollView) => { this.scrollView = scrollView; }} 
            //decelerationRate={0}
            //snapToInterval={width - 60}
            //snapToAlignment={"center"}
            //pagingEnabled={true}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
              
            <View style={styles.category_list}>
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            </View>
            <View style={styles.category_list}>
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            </View>
            <View style={styles.category_list}>
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            </View>
            <View style={styles.category_list}>
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            <SimpleLineIcons style={styles.plan} name="picture" size={180} color="black" />
            </View>
              
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 31,
  },
  category_list: {
    flexDirection: 'row',
  },
  plan:{
    padding:10,
  },
})
