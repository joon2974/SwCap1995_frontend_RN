import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default class HomeMain extends Component{

    static navigationOptions = {
        title: 'Plan A',
        headerRight: () => <Ionicons
            name='ios-log-out'
            size= {30}
            style={{marginRight: 10}}
            onPress={() => firebase.auth().signOut()}/>,
    };

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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});