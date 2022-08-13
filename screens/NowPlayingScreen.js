import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView} from "react-native";
import { FontAwesome } from '@expo/vector-icons';


const NowPlaying = ({navigation, route}) => {
    const [nowPlaying, setNowPlaying] = useState([]);

    const getNowPlayingMovies = async () => {
        const apiURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=10fe420a598514e2f4d8396214e168bf&%20language=en-US&page=1&region=CA';
        try {
            const response = await fetch(apiURL);
            const jsonData = await response.json();
            setNowPlaying(jsonData.results);
        } catch (error) {
            console.log(error);
        }
    }

        useEffect( () => {
            getNowPlayingMovies();
        }, []);

        const onPressItem = (item) => {
            console.log("item:: ", item)
            navigation.navigate("MovieDetailScreen", {movieDetail: item});
        }


        const renderItem = ( {item} ) => (
            <Pressable onPress={() => onPressItem(item)}>
                <View style={styles.itemRow}>
                    <View style={styles.details}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.release_date}>Release Date: {item.release_date}</Text>
                    </View>
                    <FontAwesome name="angle-right" size={30} color="orangered"/>
                </View>
                <View style={styles.separator}></View>
            </Pressable>
        );

        return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading}>Now Playing</Text>
                <FlatList 
                    data={nowPlaying}
                    keyExtractor={ (item) => {return item.id}}
                    renderItem={ renderItem }
                />
            </SafeAreaView>
        );
}

export default NowPlaying;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        width:"100%"
    },
    heading: {
        fontSize: 22,
        textAlign:"center",
        margin:10
    },
    details: {
        display:"flex",
        flexDirection:"column"
    },
    title: {
        fontSize:18,
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
    itemRow: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems:'center',
        margin:15
    },
    logoutButton:{
        fontSize:15,
        color:"#fff"
    },
    borrowButton:{
        borderColor:"#fe6100",
        borderRadius:5,
        borderWidth:1,
        color:"#fe6100",
        padding:12,
        marginTop:10
    },
    
});