import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader'
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class Exchange extends Component{

  constructor(){
    super()
    this.state = {
      userName : firebase.auth().currentUser.email,
      itemName : "",
      description : ""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  addItem=(itemName, description)=>{
    var userName = this.state.userName
    //var exchangeId = this.createUniqueId()
   
    db.collection('exchange_requests').add({
      username    : this.state.userName,
      item_name   : this.state.itemName,
      description : this.state.description,
     })
   
     .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });

     this.setState({
       itemName : '',
       description :''
     })
     
     
    
     // NOTE: Comment below return statement when you test the app in ios
     // ToastAndroid.showWithGravityAndOffset('Item ready to exchange',
     //    ToastAndroid.SHORT,
     //  );
     // return this.props.navigation.navigate('HomeScreen')

     // NOTE:  Comment the below return statement when you test the app in android
     return Alert.alert(
          'Item ready to exchange',
          '',
          [
            {text: 'OK', onPress: () => {

              this.props.navigation.navigate('HomeScreen')
            }}
          ]
      );
  }

 getIsExchangeRequestActive(){
   db.collection('users')
   .where('username', '==', this.state.userName)
   .onSnapshot(querySnapshot => {
     querySnapshot.forEach(doc=>{
       this.setState({
         IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
         userDocId:doc.id
       })
     })
   })
 }

 getExchangeRequest=()=>{
   var exchangeRequests = db.collection('exchange_request')
   .where('username', '==', this.state.userName)
   .get()
   .then((snapshot)=>{
     snapshot.forEach((doc)=>{
       if(doc.data().item_status !=="recieved"){
         this.setState({
           exchangeId : doc.data().exchangeId,
           requestedItemName: doc.data().requestedItemName,
           itemStatus: doc.data().item_status,
           docId: doc.id
         })
       }
     })
   })
 }

  render(){
    return(
     <SafeAreaProvider>
      <View style={{flex:1}}>
      <MyHeader title="Add Item"/>
      <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Item Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              itemName: text
            })
          }}
          value={this.state.itemName}
        />
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.formTextInput,{height:100}]}
          placeholder ={"Description"}
          onChangeText={(text)=>{
            this.setState({
              description: text
            })
          }}
          value={this.state.description}

        />
        <TouchableOpacity
          style={[styles.button,{marginTop:10}]}
          onPress = {()=>{this.addItem(this.state.itemName, this.state.description)}}
          >
          <Text style={{color:'#ffff', fontSize:18, fontWeight:'bold'}}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[styles.button,{marginTop:10}]}
         onPress = {()=>{}}
        >
         <Text>I Recieved The Item</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      </View>
      </SafeAreaProvider> 
    )
  }
}


const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

})