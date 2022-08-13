import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView} from "react-native";

import { auth, db } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, query, where  } from "firebase/firestore";
import { FontAwesome } from '@expo/vector-icons';


const MyPurchasesScreen = ({navigation, route}) => {
    const loggedInUserObj = auth.currentUser;
    const [myPurchses, setMyPurchases] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const checkUser = () => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
        })
        return listener
    }

    const getMyPurchases = async () => {
        console.log("show purchased tickets");
        setMyPurchases([])
        // get from firestore
        try {
            const myTickets = collection(db, "purchasedTicket");
            const q = query(myTickets, where("userId", "==", loggedInUserObj.uid));

            const querySnapshot = await getDocs(q);
            const documents = querySnapshot.docs

            let tempArray = [];
            for (let i = 0; i < documents.length; i++) {
                const currDocument = documents[i];
                let curDocObj = currDocument.data();
                
                curDocObj.id = currDocument.id;
                tempArray.push(curDocObj);
            }
            
            setMyPurchases(tempArray);

        } catch (err) {
            console.log(`${err.message}`)
        }
    }

    useEffect(() => {
        checkUser(),
        getMyPurchases();
    }, [isLoggedIn]);

    const loginOrCreateAccount = () => {
        console.log("Login or Create a New Account")    
        navigation.navigate("LoginScreen", {movieDetail: null});
    }

    const renderItem = ( {item} ) => (
        <View>
            <View style={styles.itemRow}>
                <FontAwesome style={styles.ticketIcon} name="ticket" size={32} color="#4b6584" />
                <View style={styles.details}>
                    <Text style={styles.font18}>{item.movieName}</Text>
                    <Text>{`Num Tickets: ${item.numTickets}`}</Text>
                    <Text style={styles.textPink}>{`Total Paid: ${item.total}`}</Text>
                </View>
            </View>
            <View style={styles.separator}></View>
        </View>
    );

    const ItemDivider = () => {
        return (
            <View style={styles.itemDevider}/>
        );
    }

    return(
        <SafeAreaView style={isLoggedIn ? styles.listContainer : styles.container}>
            {isLoggedIn ? 
            <View>
                <Text style={styles.heading}>Your Tickets</Text>
                {myPurchses.length > 0 ?
                    <FlatList 
                        data={myPurchses}
                        keyExtractor={ (item) => {return item.id}}
                        renderItem={ renderItem }
                        ItemSeparatorComponent={ItemDivider}
                    />
                :
                    <Text style={{textAlign:'center'}}>You have no purchases.</Text>
                }
            </View>
            :
            <View>
                <Text style={styles.heading}>Your Tickets</Text>
                <Text style={styles.erText}>You must be logged in to use this feature</Text>
                <Pressable style={styles.pressable} onPress={()=>loginOrCreateAccount()}>
                    <Text style={styles.btnText}>Login or Create New Account</Text>
                </Pressable>
            </View>
            }
        </SafeAreaView>
    );
}

export default MyPurchasesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        width:"100%"
    },
    listContainer: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'space-between',
        width:"100%"
    },
    heading: {
        fontSize: 22,
        textAlign:"center",
        margin:10
    },
    erText: {
        textAlign:"center",
        marginBottom:10
    },
    pressable: {
        height:50,
        backgroundColor:'orangered',
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:90
    },
    btnText: {
        fontSize:17,
        color:"#fff"
    },
    itemRow: {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems:'center',
        margin:15
    },
    ticketIcon:{
        paddingRight:20
    },
    font18:{
        fontSize:18
    },
    textPink:{
        color:'#ff5252'
    },
    itemDevider:{
        height: 1,
        width: "100%",
        backgroundColor: "#cccccc",
    },

});