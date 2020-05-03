import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, TextInput, Button, TextInputBase,Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import firebase from 'firebase';

const {height, width} = Dimensions.get('window');
export default class FindPassword extends Component{
    state = {
        ID: ""
    }
    render(){
        const {ID}=this.state;
        return(
            <View style={styles.container}>
                  <Image
                        style={{width:70,height:100,marginTop:10}}
                        source={{uri:'https://cdn.pixabay.com/photo/2013/07/12/15/22/keyhole-149772_960_720.png'}}
                    />
                    <View>
                        <Text>가입시 입력한 이메일을 입력해주세요</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text>비밀번호 찾기에관한 설명 어쩌구 저쩌구 자나</Text>
                    </View>
                    <View style={styles.findPasswordContainer}>
                        <View style={styles.lineContainer}>
                            <View style={styles.lineTextContainer}>
                                <Text>이메일</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                value={ID}
                                onChangeText = {(ID) => this.setState({ID})}
                                style={styles.input}
                                placeholder='abc@example.com'
                               keyboardType='email-address'/>
                             </View>
                         </View>
                         <Button 
                         style={{marginTop: 10}}
                         title='비밀번호 초기화'
                         onPress={() => alert(`입력 이메일:${ID}`)}>
                        </Button>
                    </View>
                </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'white',
    },
    findPasswordContainer: {
        height: height * 6 / 7,
        width: width,
        alignItems: 'center',
        marginTop:100
    },
    lineContainer: {
        width: width -20,
        height: 45,
        marginBottom: 10,
        flexDirection: 'row',
    },
    lineTextContainer: {
        width: 55,
        height: 45,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 5,
    },
    inputContainer: {
        width: width - 100,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#F2F2F2',
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        width: width - 55,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 20,
    },
    descriptionContainer:{
        width:width,
        height:100,
        borderRadius:10,
        borderStyle:"solid",
        borderWidth: 0.5,
        borderColor: 'black',
        alignItems: 'center',
    }
});