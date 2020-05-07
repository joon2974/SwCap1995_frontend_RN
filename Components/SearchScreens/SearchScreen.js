import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import { SearchBar } from 'react-native-elements';

import { SimpleLineIcons} from '@expo/vector-icons';
import Axios from 'axios';

//const { width } = Dimensions.get('window');


class Recommend extends Component{

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
    return (
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
    )
  }
}

class SearchResult extends Component{

  render(){

    let pic = {
      //uri : search
        uri : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }


    return(

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
      <Image source = {pic} style = {styles.plan} />
      <Image source = {pic} style = {styles.plan} />
      </View>
      <View style={styles.category_list}>
      <Image source = {pic} style = {styles.plan} />
      <Image source = {pic} style = {styles.plan} />
      </View>
      <View style={styles.category_list}>
      <Image source = {pic} style = {styles.plan} />
      <Image source = {pic} style = {styles.plan} />
      </View>
      <View style={styles.category_list}>
      <Image source = {pic} style = {styles.plan} />
      <Image source = {pic} style = {styles.plan} />
      </View>
        
     </ScrollView>

    )
  }

}

class Search extends Component{

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };


  render(){
    const { search } = this.state;

    return(

      <View> 
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    </View>


    )
  }
}




export default class Searchscreen extends Component {

  /*
  constructor(props){
    super(props)
    this.state = {
      plandata:[

      ]
    }
  }
  componentDidMount(){
    Axios.get('https://~~')
    .then(response => 
      {this.setState({plandata:response.plandata})
    })
  }
  */


  render() {

    let pic = {
      //uri : search
        uri : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    }

    return (

      <View style = {styles.container}>

        <Search />        

        <Recommend />

        <SearchResult />

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
    padding:5,
  },
  plan:{
    margin:10,
    width:180,
    height:150,
  },
})
