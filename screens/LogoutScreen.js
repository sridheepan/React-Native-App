import { useState } from "react";

import { View, Text, StyleSheet, Alert, Pressable} from "react-native";
import { auth } from "../FirebaseApp"
import { signOut } from "firebase/auth"


const LoginScreen = ({navigation, route}) => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] =useState(false);

    const logoutPressed = async() => {
        try {
            await signOut(auth)
            console.log("User signed out")
        }
        catch (err) {
            Alert.alert(`Signout failed, error occurred: ${err.message}`)
            console.log(`Error code: ${err.code}`)
            console.log(`Error message: ${err.message}`)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.heading}>Are you ready to Logout?</Text>

            <View style={styles.innerContainer}>
                <Pressable style={styles.pressable} onPress={logoutPressed}>
                    <Text style={styles.logoutButton}> Logout </Text>
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
        justifyContent:'center'
    },
    heading: {
        fontSize: 22,
        textAlign:"center"
    },
    innerContainer: {
        alignItems:'right',
        justifyContent:'flex-start',
        width:"95%",
    },
    pressable:{
        width:'100%',
        marginTop: 10,
    },
    logoutButton:{
        textAlign: "center",
        backgroundColor:"orangered",
        color:"#fff",
        padding:13,
        margin:12,
        marginTop:0,
        height:50,
        fontSize:19,
    }
});

export default LoginScreen;