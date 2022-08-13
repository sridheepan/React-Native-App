import { useState } from "react";

import { View, Text, StyleSheet, TextInput, Alert, Pressable} from "react-native";
import { auth } from "../FirebaseApp"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"


const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const movieDetail = route.params.movieDetail;


    const navigateToPage = () => {
        if (movieDetail) {
            navigation.navigate("MovieDetailScreen", {movieDetail: movieDetail});
        } else {
            navigation.navigate("MyPurchasesScreen");
        }
    }

    const loginPressed = async() => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            navigateToPage();
        } catch (err) {
            Alert.alert(err.message)
        }
    } 

    const createAccountPressed = async() => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            navigateToPage();
         } catch (err) {
            Alert.alert(err.message)
         }
    } 

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Login to Your Account</Text>

            <View style={styles.innerContainer}>
                <Text style={styles.label}>Email Address:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize='none'
                    onChangeText={setEmail}
                    value={email}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />

                <Pressable style={styles.pressable} onPress={loginPressed}>
                    <Text style={styles.loginButton}> Login</Text>
                </Pressable>

                <Pressable style={styles.pressable} onPress={createAccountPressed}>
                    <Text style={styles.createAccountButton}> Create New Account</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    heading: {
        fontSize: 23,
        margin: 20,
        textAlign:"center"
    },
    innerContainer: {
        alignItems:'right',
        justifyContent:'flex-start',
        width:"95%",
    },
    label: {
        fontSize: 15,
        fontWeight:'300'
    },
    pressable:{
        width:'100%',
        marginTop: 10,
    },
    input: {
        height: 43,
        width: "100%",
        borderWidth: 1,
        marginBottom:15,
        marginTop:5,
        padding: 10,
        fontSize:14,
        borderColor:"#888888"
    },
    loginButton:{
        textAlign: "center",
        backgroundColor:"orangered",
        color:"#fff",
        padding:13,
        margin:12,
        marginTop:0,
        height:50,
        fontSize:19,
    }, 
    createAccountButton:{
        textAlign: "center",
        backgroundColor:"#fff",
        borderColor:"orangered",
        borderRadius:5,
        borderWidth:1.5,
        color:"orangered",
        padding:13,
        margin:15,
        marginTop:0,
        height:50,
        fontSize:18,
    },
    error:{
        color:"#fff",
        backgroundColor:"#d41159",
        padding:10,
        width:"100%"
    }
});

export default LoginScreen;