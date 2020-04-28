
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, ScrollView, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';
//import { Constants } from 'expo';

const { width } = Dimensions.get('window');

export default class HomeMain extends Component{
    
    static navigationOptions = {
        title: 'Plan A',
        headerRight: () => <Ionicons
            name='ios-log-out'
            size= {30}
            style={{marginRight: 10}}
            onPress={() => firebase.auth().signOut()}/>,
    };

    
    //스크롤뷰 포지션 잡는건데 상식상으로 없애면 안될듯 하지만 없어도 됨. 디폴트 값이 존재하는듯.
    /* 
    componentDidMount() {
		setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1) // scroll view position fix
	}
    */

    // 가로 스크롤뷰.
    render() {
        return (
          <View style = {styles.container}>     
          <ScrollView style = {styles.scrollview1}
            ref={(scrollView) => { this.scrollView = scrollView; }}
            style={styles.container}
            //pagingEnabled={true}
            horizontal= {true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={"center"}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
              
            <View style={styles.view}>
              <Entypo name="area-graph" size={250} color="black" />
            </View>
            <View style={styles.view}>
              <Entypo name="area-graph" size={250} color="black" />
            </View>
            <View style={styles.view}>
              <Entypo name="area-graph" size={250} color="black" />
            </View>
          </ScrollView>
         
          <ScrollView style = {styles.scrollview1}
            ref={(scrollView) => { this.scrollView = scrollView; }}
            style={styles.container}
            //pagingEnabled={true}
            horizontal= {true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={"center"}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
              
            <View style={styles.view}>
              <AntDesign name="videocamera" size={250} color="black" />
            </View>
            <View style={styles.view}>
              <AntDesign name="videocamera" size={250} color="black" />
            </View>
            <View style={styles.view}>
              <AntDesign name="videocamera" size={250} color="black" />
            </View>
                  </ScrollView>

          </View>
        ); 
      }


      //버튼 누르면 가르키는 페이지 넘어가는거
    /*
    render(){
        return (
            <View style={styles.container}>
                <Text>Home Main</Text>
                <Button 
                    title='Go To Mypage'
                    onPress={() => this.props.navigation.navigate('MyMenuScreen')}/>
            </View>
        );
    }

    */

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    //  alignItems: 'center',       //이거 건들면 에러남
    //  justifyContent: 'center',   //이거 건들면 에러남
    },
    scrollview1:{
        flex:1,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: 'white',
        width: width - 105,
        margin: 20,
        height: 250,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'black',
        //paddingHorizontal : 30,
    },
});

