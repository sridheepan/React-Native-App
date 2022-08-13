import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen'
import MovieDetailScreen from './MovieDetailScreen'
import NowPlayingScreen from './NowPlayingScreen'
import BuyTickets from './BuyTickets'

import { useState, useEffect } from "react";
import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"


const Stack = createNativeStackNavigator();

export default function NowPlayingNavigationStack() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                setIsSignedIn(true);
            }
            else {
                setIsSignedIn(false);
            }
        })
        return listener
    }, []);

    return(
        <Stack.Navigator>
            <Stack.Screen component={NowPlayingScreen} name="NowPlayingScreen"></Stack.Screen>
            <Stack.Screen component={MovieDetailScreen} name="MovieDetailScreen"></Stack.Screen>
            <Stack.Screen component={BuyTickets} name="BuyTickets"></Stack.Screen>
            { (isSignedIn === false ) && <Stack.Screen component={LoginScreen} name="LoginScreen"></Stack.Screen> }
        </Stack.Navigator>
      );
}