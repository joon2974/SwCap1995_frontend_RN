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
        var auth = firebase.auth();
        return(
            <View style={styles.container}>
                  <Image
                        style={{width:80,height:100,marginTop:10}}
                        source={{uri:'https://cdn.pixabay.com/photo/2013/07/12/15/22/keyhole-149772_960_720.png'}}
                    />
                    <View>
                        <Text>가입시 입력한 이메일을 입력해주세요</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>이메일을 입력하시고 초기화 버튼을 누르시면 초기화 인증번호가 발송됩니다. 올바른 이메일을 입력해주세요</Text>
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
                         onPress={() => auth.sendPasswordResetEmail(ID).then(function() {
                            alert("이메일을 확인해주세요");
                          }).catch(function(error) {
                            // An error happened.
                            alert('에러');
                          })}>    
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
        width:width-10,
        height:100,
        borderRadius:10,
        borderStyle:"solid",
        borderWidth: 0.5,
        borderColor: 'black',
        alignItems: 'center',
    },
    descriptionText:{
        width:width-40,
    },
});