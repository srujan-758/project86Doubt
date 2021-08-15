import React from 'react'
import { AppTabNavigator } from './AppTabNavigator'
import SettingScreen from '../screens/SettingScreen'
import {createDrawerNavigator} from 'react-navigation-drawer'
import customSideBarMenu from './customSideBarMenu'

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
     screen:AppTabNavigator   
    },

    Settings : {
     screen:SettingScreen   
    }

   },

   {
    contentComponent:customSideBarMenu
   },

   {
    initialRouteName:'Home'
})