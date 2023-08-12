/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";

import FontAwesome5 from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AntDesign from "react-native-vector-icons/AntDesign";

import EditProfileScreen from "../screens/profiles/EditProfileScreen";
import DashboardScreen from "../screens/DashboardScree";
import CreateNoteScreen from "../screens/CreateNoteScreen";
import DetailNoteScreen from "../screens/DetailNoteScreen";
import { NoteProps } from "../model/NoteModel";
import MyProfilesScreen from "../screens/MyProfilesScreen";
import MyArchiveItem from "../screens/MyArchiveItem";
import SettingMode from "../screens/SettingMode";

export type RootStackParams = {
  Dashboard: undefined;
  Create: undefined;
  Detail: { note: NoteProps };
  Profile: undefined;
  Archive: undefined;
  Mode: undefined;

  // old
};
const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <RootStack.Screen name="TabsStack" component={TabStackScreen} /> */}
      <RootStack.Screen name="Dashboard" component={DashboardScreen} />
      <RootStack.Screen name="Create" component={CreateNoteScreen} />
      <RootStack.Screen name="Detail" component={DetailNoteScreen} />
      <RootStack.Screen name="Profile" component={MyProfilesScreen} />
      <RootStack.Screen name="Archive" component={MyArchiveItem} />
      <RootStack.Screen name="Mode" component={SettingMode} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
