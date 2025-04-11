import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen.tsx';
import { NavigationContainer } from '@react-navigation/native'
import Transaction from './src/screens/ProfileScreen.tsx';
import Bell from './src/screens/Bell.tsx';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ChatBot from './src/screens/ChatBot.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bolo from './src/FloatingScreens/Bolo.tsx';
import Ai_Alerts from './src/FloatingScreens/Ai-Alerts.tsx';
import Invoice from './src/FloatingScreens/Invoice.tsx';
import AccountSnapshots from './src/FloatingScreens/AccountSnapshots.tsx';
const Tab = createBottomTabNavigator();
const Stack=createNativeStackNavigator();


function FloatinScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Bolo" component={Bolo} />
      <Stack.Screen name="Ai" component={Ai} />
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen name="AccountSnaps" component={AccountSnapshots} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarActiveTintColor: '#FF5722',
          headerShown: false,
          //tabBarLabel: 'For You',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={30} />
          ),

        }} />
      <Tab.Screen name="Transaction" component={Transaction}
        options={{
          tabBarActiveTintColor: '#FF5722',
          headerShown: false,
          //tabBarLabel: 'For You',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" color={color} size={size} />
          ),

        }} />
      <Tab.Screen name="Bell" component={Bell}
        options={{
          tabBarActiveTintColor: '#FF5722',
          headerShown: false,
          //tabBarLabel: 'For You',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bell" color={color} size={size} />
          ),

        }} />
      <Tab.Screen name="ChatBot" component={ChatBot}
        options={{
          tabBarActiveTintColor: '#FF5722',
          headerShown: false,
          //tabBarLabel: 'For You',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="rocketchat" color={color} size={size} />
          ),

        }} />


    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Main tab navigator */}
        <Stack.Screen name="MainTabs" component={MyTabs} />

        {/* Floating screens */}
        <Stack.Screen name="Bolo" component={Bolo} />
        <Stack.Screen name="Ai" component={Ai_Alerts} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="AccountSnapshots" component={AccountSnapshots} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


