import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import NowPlayingScreen from './screens/NowPlayingScreen';
import PurchaseNavigationStack from './screens/PurchaseNavigationStack';
import LogoutScreen from './screens/LogoutScreen';
import NowPlayingNavigationStack from './screens/NowPlayingNavigationStack';


import { useState, useEffect } from "react";

import { auth } from "./FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"

const Tab = createBottomTabNavigator();

export default function App({route}) {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                setUserLoggedIn(true);
            }
            else {
                setUserLoggedIn(false);
            }
        })
        return listener
    }, []);

    return(
        <NavigationContainer>
            <Tab.Navigator screenOptions={ ({route}) => ({
                "headerShown": false,
                "tabBarStyle": [{
                    "display" : "flex"
                }, null],
                "tabBarActiveTintColor": "orangered",
                "tabBarInactiveTintColor": "gray",
                "tabBarIcon": ( {focused, color, size} ) => {
                    let iconName;

                    if(route.name === "Now Playing"){
                        iconName = 'list-ul';
                    }else if (route.name === "My Purchases"){
                        iconName = 'ticket';
                    }
                    else if (route.name === "LogoutScreen"){
                        iconName = 'user-o';
                    }
                    return <FontAwesome name={iconName} size={size} color={color} />;
                }
            })
            }>
                <Tab.Screen index='0' name="Now Playing" component={NowPlayingNavigationStack} />
                <Tab.Screen name="My Purchases" component={PurchaseNavigationStack} options={{unmountOnBlur: true}}/>
                { (userLoggedIn === true ) && <Tab.Screen name="LogoutScreen" component={LogoutScreen} /> }
                
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}