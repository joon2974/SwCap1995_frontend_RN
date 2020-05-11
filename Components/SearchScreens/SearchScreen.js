import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

//const { width } = Dimensions.get('window');

export default class Searchscreen extends Component {

  state = {
    search: '',
    temp : 'abc',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  sendSearch = (temp) => {
    axios.get('http://49.50.172.58:3000/categories/search?query=' + temp ).then(res => {
      console.log(res);
      alert(res.data);
    }).catch(error => {
      console.log(error);
      alert(error);
    });
  }

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

  render(){
    const { search } = this.state;

    let pic = {
      //uri : search
      uri : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }

    return (

      <View style = {styles.container}>


        <View style = {styles.searchBar}>
          <Input
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
          />  
          <Button
            title="검색"
            type="solid"
            onPress={this.sendSearch}
          />
        </View>


        <View>
          <Text style = {styles.categoryRecommend}>
            Today Recommended
          </Text>
        
          <FlatList 
            horizontal
            data = {this.state.categoryData}
            renderItem = {({item, index}) => 
              <View style = {{padding: 5}}>
                <View style = {styles.categoryIcon}>
                  <Text style = {styles.categoryTitle}>{item.name}</Text>
                </View>
              </View>
            }
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
          }}
        >
          
          <View style={styles.categoryUnitList}>
            <Image source ={pic} style = {styles.plan} />
            <Image source = {pic} style = {styles.plan} />
          </View>
          <View style={styles.categoryUnitList}>
            <Image source = {pic} style = {styles.plan} />
            <Image source = {pic} style = {styles.plan} />
          </View>
          <View style={styles.categoryUnitList}>
            <Image source = {pic} style = {styles.plan} />
            <Image source = {pic} style = {styles.plan} />
          </View>
          <View style={styles.categoryUnitList}>
            <Image source = {pic} style = {styles.plan} />
            <Image source = {pic} style = {styles.plan} />
          </View>  
        </ScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor: 'white',
    paddingVertical: 50,
  },
  searchBar:{
    width:350, 
    flexDirection:'row'
  },
  categoryRecommend:{
    fontWeight: 'bold', 
    paddingHorizontal:10, 
    paddingVertical:10, 
    fontSize:18,
  },
  categoryIcon:{
    backgroundColor: 'white', 
    borderWidth: 5, 
    borderColor: '#626262', 
    borderRadius:20, 
    height: 50, 
    width: 70
  },
  categoryTitle:{
    paddingHorizontal:14,
    paddingVertical:8, 
    fontWeight:'bold'
  },
  categoryUnitList: {
    flexDirection: 'row',
    padding:5,
  },
  plan:{
    margin:10,
    width:180,
    height:150,
  },
})
