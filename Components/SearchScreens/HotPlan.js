import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button, ScrollView} from 'react-native';

export default class HotPlan extends Component{

    render(){


        let pic = {
            //uri : search
            uri : 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        }

        return (
          
            <View style = {styles.container}>
                <View>
                    <Text style = {styles.recommendTitle}>
                        클릭된 세대의 인기플랜 Top 20
                    </Text>
                    <Text style = {styles.recommendSubTitle}>
                        클릭된 세대의 인기플랜 서브 타이틀~~~~~~~~
                    </Text>
                </View>


                <ScrollView>
                    
                <View style={styles.categoryUnitList}>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryUnitList}>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryUnitList}>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryUnitList}>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryUnitList}>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.category} onPress = {() => this.props.navigation.navigate('DetailPlan')} >
                        <Image source = {pic} style = {styles.category} />
                    </TouchableOpacity>
                </View>

                </ScrollView>

            </View>

        );
    }

}


const styles = StyleSheet.create({

    container:{
        flex:1
    },


    recommendTitle:{
        fontWeight: 'bold', 
        paddingHorizontal:10, 
        paddingVertical:20, 
        fontSize:24,
      },
      recommendSubTitle:{
        paddingHorizontal:10, 
        paddingVertical:10, 
        fontSize:16,
      },

    categoryUnitList: {
        flexDirection: 'row',
        padding:5,
      },
      category:{
        margin:5,
        width:180,
        height:150,
      },
});