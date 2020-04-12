import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class MyTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Ionicons name='ios-person' style={{color: tintColor}}/>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>My Menu</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});