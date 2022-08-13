import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyPurchasesScreen from './MyPurchasesScreen';
import LoginScreen from './LoginScreen';

import { useState, useEffect } from "react";
import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"

const Stack = createNativeStackNavigator();

export default function PurchaseNavigationStack() {
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
            <Stack.Screen component={MyPurchasesScreen} name="MyPurchasesScreen"></Stack.Screen>
            { (isSignedIn === false ) && <Stack.Screen component={LoginScreen} name="LoginScreen"></Stack.Screen> }
        </Stack.Navigator>
    );
}