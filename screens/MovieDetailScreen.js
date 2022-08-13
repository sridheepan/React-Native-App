import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../FirebaseApp"
import { onAuthStateChanged } from "firebase/auth"
import { FontAwesome } from '@expo/vector-icons';

const MovieDetailsScreen = ( {navigation, route} ) => {

    const movieDetail = route.params.movieDetail;
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, (userFromFirebaseAuth) => {
            if (userFromFirebaseAuth) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
        })
        return listener
    }, [])

    const buyTickets = () => {
        navigation.navigate("BuyTickets", {movieDetail: movieDetail});
    }

    const loginOrCreateAccount = () => {
        navigation.navigate("LoginScreen", {movieDetail: movieDetail});
    }

    return (
        <View style={styles.container}>
            <Image style={styles.movieImg} source={{uri: `https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}}/>
            <View style={styles.detailContainer}>
                <View style={styles.titleRatingContainer}>
                    <Text style={styles.title}>{movieDetail.title}</Text>
                    <View style={styles.titleRatingContainer}>
                        <Text style={styles.rating}>{movieDetail.vote_average*10}%</Text>
                        <FontAwesome name="star" size={22} color="#fdce2d"/>
                    </View>
                </View>
                <Text style={styles.date}>{movieDetail.release_date}</Text>
                <Text style={styles.subtitle}>Plot Summary</Text>
                <Text style={styles.overview}>{movieDetail.overview}</Text>
            </View>
            {isLoggedIn ? 
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.pressable} onPress={()=>buyTickets()}><Text style={styles.btnText}>Buy Tickets</Text></Pressable>
                </View>
                :
                <View style={styles.buttonContainerAlt}>
                    <View>
                        <Text style={styles.erText}>You must be logged in to use this feature</Text>
                        <Pressable style={styles.pressableAlt}><Text style={styles.btnTextAlt}>Buy Tickets</Text></Pressable>
                    </View>
                    <View>
                        <Pressable style={styles.pressable} onPress={()=>loginOrCreateAccount()}><Text style={styles.btnText}>Login or Create New Account</Text></Pressable>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    movieImg: {
        width: '100%',
        height: 300,
    },
    detailContainer: {
        margin:10
    },
    titleRatingContainer: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center'
    },
    title: {
        fontSize: 23,
        fontWeight:'bold'
    },
    rating: {
        fontSize: 23
    },
    subtitle: {
        marginTop:20,
        fontSize: 18,
        fontWeight:'bold'
    },
    date: {
        fontSize: 18,
        color:'gray'
    },
    overview: {
        marginTop:5
    },
    buttonContainer: {
        flex:1,
        flexDirection:"row",
        position:'absolute',
        bottom:0,
        marginHorizontal:15
    },
    buttonContainerAlt: {
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        marginHorizontal:15
    },
    pressable: {
        width:"100%",
        height:50,
        backgroundColor:'orangered',
        alignItems:"center",
        justifyContent:"center",
        position:'relative',
        marginBottom:20
    },
    pressableAlt: {
        width:"100%",
        height:50,
        backgroundColor:'lightgray',
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30,
        borderRadius:5,
        borderColor:'gray',
        borderWidth:1
    },
    btnText: {
        fontSize:17,
        color:"#fff"
    },
    btnTextAlt: {
        fontSize:17,
        color:"gray"
    },
    erText: {
        textAlign:"center",
        marginBottom:10
    }
    
});

export default MovieDetailsScreen;