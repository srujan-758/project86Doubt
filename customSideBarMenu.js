import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {DrawerItems} from 'react-navigation-drawer' 
import firebase from 'firebase';
import SignupLoginScreen from '../screens/SignupLoginScreen';

export default class customSideBarMenu extends Component {
    render(){
      return(
        <View style={{flex:1}}>
          <DrawerItems {...this.props}/>
          <View style={{flex:1,justifyContent:'flex-end',paddingBottom:30}}>
            <TouchableOpacity style={{justifyContent:'center',padding:10,height:10,width:'100%'}}
                 onPress={()=>{
                  this.props.navigation.navigate(SignupLoginScreen);
                  firebase.auth().signOut()
                }}>
               <Text>LOG OUT</Text>     
            </TouchableOpacity>  
          </View>
        </View>  
      )  
    }
}