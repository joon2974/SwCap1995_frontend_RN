import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class HomeTab extends Component{

    static navigationOptions = {
        tabBarIcon: ({tintColor}) => (
            <Ionicons name='ios-home' style={{color: tintColor}}/>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Home</Text>
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