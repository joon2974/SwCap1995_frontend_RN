import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {CardSix, CardSeven} from '../SearchScreens/Cards';

export default class VariableCard extends Component {
 
    state={
        onOff:0,
    }
 
    render() {

    let testVari = null;
    if (this.state.onOff === 0) {
      testVari = (
        <CardSix
          title="Vinny’s Barber"
          subTitle="852 N Virgil Ave, Beverly Hills"
          profile={{
            uri:
            'https://lemag.nikonclub.fr/wp-content/uploads/2016/11/Photo-selection-pour-Nikon-France-Mattia-Bonavida-2016-6.jpg',
          }}
          image={{
            uri:
            'https://idinterdesign.ca/wp-content/uploads/2016/07/paysage-ID-02-750x468.jpg',
          }}
          icon1="star"
          iconColor1="#fff"
          iconBackground1="red"
          switchShowing={() => {
            this.setState({ onOff: 1 });
          }}

          icon2="rocket"
          iconColor2="#fff"
          iconBackground2="purple"
         
      />
      );
    } else if (this.state.onOff === 1) {
      testVari = (

        <TouchableOpacity
        style = {{height:50, width:50, backgroundColor:'red'}} onPress={()=>this.setState({onOff:0})} >

        </TouchableOpacity>
    //     <CardSeven
    //       title="Vinny’s Barber"
    //       subTitle="852 N Virgil Ave, Beverly Hills"
    //       image={{
    //         uri:
    //         'https://idinterdesign.ca/wp-content/uploads/2016/07/paysage-ID-02-750x468.jpg',
    //       }}
    //       icon1="share"
    //       iconColor1="#fff"
    //       iconBackground1="purple"
    //       switchShowing={() => {
    //         this.setState({ onOff: 0 });
    //       }}
    //       icon2="heart"
    //       iconColor2="#fff"
    //       iconBackground2="red"
    //       onClicked2={() => {
    //         alert('Hello!');
    //       }}
    //   />
      );
    } 

    return (

      <View>
          {testVari}
      </View>
      
    );
  }
}
