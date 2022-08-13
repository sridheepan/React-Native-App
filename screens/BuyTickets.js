import { useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable, TextInput, SafeAreaView} from "react-native";
import { auth, db } from "../FirebaseApp"
import { collection, addDoc } from "firebase/firestore"

const BuyTickets = ({navigation, route}) => {
    const movieTicketPrice = 12;
    
    const loggedInUserObj = auth.currentUser;
    const movieDetail = route.params.movieDetail;
    const [email, setEmail] = useState(loggedInUserObj.email);
    const [name, setName] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    
    const [count, setCount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);
    const [showOrderSummary, setShowOrderSummary] = useState(false);


    const pressedCountBtn = (type) => {
        let counter;
        if (type == "add") {
            counter = count + 1;
            setCount(counter);
        } else if (type == "substract" && count > 0){
            counter = count - 1;
            setCount(counter);
        }
        
        if(counter > 0){
            setErrorMessage('');
            setShowError(false);
            setShowOrderSummary(true);
            orderSummary(counter);
        }
        else{
            setShowOrderSummary(false);
            setSubTotal(0);
            setTax(0);
            setTotal(0);
        }
    }

    const confirmPurchasePressed = async () => {
        console.log('purchase button pressed');
        
        if(validateFields() === true){
            try {
                const purchasedTicketToInsert = {
                    movieId:movieDetail.id,
                    movieName:movieDetail.title,
                    nameOnPurchase:name,
                    numTickets:count,
                    total: parseFloat(total.toFixed(2)),
                    userId: loggedInUserObj.uid
                }
                const insertedDocument =  await addDoc(collection(db, "purchasedTicket"), purchasedTicketToInsert);
                Alert.alert("Purchase Success!");
                navigation.navigate("NowPlayingScreen");
            }
            catch (err) {
                console.log(`${err.message}`)
            }
        }
    }

    const validateFields = () => {
        let returnValue = false;
        if(email === "" || name === ""){
            setErrorMessage('All fields must be filled in.');
            setShowError(true);
        }
        else if (count === 0){
            setErrorMessage('User must buy one or more tickets');
            setShowError(true);
        }
        else{
            setErrorMessage('');
            setShowError(false);
            returnValue = true;
        }
        return returnValue;
    }

    const orderSummary = (counter) =>{
        let tempSubTotal = 0;
        let tempTax = 0;
        let tempTotal = 0;

        tempSubTotal = movieTicketPrice * counter;
        setSubTotal(tempSubTotal);

        tempTax = tempSubTotal * 0.13;
        setTax(tempTax);

        tempTotal = tempSubTotal + tempTax;
        setTotal(tempTotal);
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Buy Tickets</Text>
            <Text style={styles.title}>{movieDetail.title}</Text>
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Your email address:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter your email"
                    autoCapitalize='none'
                    onChangeText={setEmail}
                    value={email}
                />
                <Text style={styles.label}>Your name:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter your name"
                    autoCapitalize='none'
                    onChangeText={setName}
                    value={name}
                />
                <Text style={styles.label}>Number of Tickets:</Text>
                <View style={styles.counterContainer}> 
                    <Pressable style={styles.countBtn} onPress={()=>pressedCountBtn("substract")}><Text style={styles.countBtnText}>-</Text></Pressable>
                    <Text style={styles.count}>{count}</Text>
                    <Pressable style={styles.countBtn} onPress={()=>pressedCountBtn("add")}><Text style={styles.countBtnText}>+</Text></Pressable>
                </View>
                
                {showOrderSummary && (
                    <View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.label}>Order Summary:</Text>
                        </View>
                        <View style={styles.orderContainer}>
                            <Text style={styles.orderSummaryLabel}>{movieDetail.title}</Text>
                            <Text style={styles.orderSummaryLabel}>{`Number of Tickets: ${count}`}</Text>
                            <Text style={styles.orderSummaryLabel}>{`Subtotal: $${subTotal.toFixed(2)}`}</Text>
                            <Text style={styles.orderSummaryLabel}>{`Tax: $${tax.toFixed(2)}`}</Text>
                            <Text style={styles.highlightedLabel}>{`Total: $${total.toFixed(2)}`}</Text>
                        </View>
                    </View>    
                )}
            </View>
            {showError && (
                <View style={styles.errorContainer}><Text style={styles.errorMessage}>Error: {errorMessage}</Text></View>
            ) }
            
            <View style={styles.buttonContainer}>
                <Pressable style={styles.pressable} onPress={confirmPurchasePressed}>
                    <Text style={styles.btnText}>Confirm Purchase</Text>
                </Pressable>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        alignItems:'center',
        width:'100%'
    },
    heading: {
        fontSize: 22,
        textAlign:"center",
        marginTop:10
    },
    details: {
        display:"flex",
        flexDirection:"column",
        margin:15
    },
    title: {
        fontSize:18,
        textAlign:"center"
    },
    label: {
        fontSize:16,
        marginTop:5,
    },
    author: {
        fontSize:17,
        marginBottom:5
    },
    release_date: {
        fontSize:15
    },
    separator:{
        height: 1,
        backgroundColor: '#CCC',
    },
    errorContainer:{
        position:'absolute',
        bottom:80,
        width:"95%"
    },
    errorMessage: {
        marginTop:20,
        padding: 10,
        backgroundColor: '#FFEBEE',
        color: '#FF0000',
      },
    buttonContainer: {
        flex:1,
        flexDirection:"row",
        position:'absolute',
        bottom:0,
        width:"95%"
    },
    pressable:{
        width:"100%",
        height:50,
        backgroundColor:'orangered',
        alignItems:"center",
        justifyContent:"center",
        position:'relative',
        marginBottom:20
    },
    innerContainer: {
        width:"95%",
        marginTop:30
    },
    input: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        marginBottom:15,
        marginTop:8,
        padding: 10,
        fontSize:14,
        borderColor:"#888888"
    },
    btnText:{
        textAlign: "center",
        backgroundColor:"orangered",
        color:"#fff",
        fontSize:16,
    },
    counterContainer: {
        flexDirection:"row",
        marginTop:10
    },
    countBtn: {
        borderWidth:1,
        borderColor:"orangered",
        padding:12
    },
    countBtnText: {
        textAlign: "center",
        color:"orangered",
        fontSize:16,
    },
    count: {
        margin:12,
        fontSize:18
    },

    orderContainer:{
        width:"95%",
        borderWidth: 1,
        borderColor:"#cccccc",
        marginTop:5,
        paddingTop:10,
        paddingBottom:5,
    },
    orderSummaryLabel:{
        paddingHorizontal:20,
        marginBottom:5,
        fontSize:18,
    },
    highlightedLabel:{
        fontSize:18,
        backgroundColor:"#fed330",
        paddingVertical: 10,
        paddingHorizontal:20,
    }
});

export default BuyTickets;
