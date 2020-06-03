import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardSix, CardSeven } from '../SearchScreens/Cards';

export default class VariableCard extends Component {

    

  render() {

    let testVari = null;
    if (this.props.onOff === this.props.index) {
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
          switchShowing={this.props.changeShowing}
          icon2="rocket"
          iconColor2="#fff"
          iconBackground2="purple"
         
      />
      );
    } else {
      testVari = (

        <TouchableOpacity
          style={{ height: 50, width: 50, backgroundColor: 'red'}} onPress={this.props.changeShowing} />
//          onPress={() => this.setState({ onOff: this.props.index })} />
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
