import { StyleSheet, Text, View } from "react-native";

function Subtitle({ children })
{
    return <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>{ children }</Text>
    
            </View>
}

export default Subtitle;

const styles = StyleSheet.create({
    subTitle: {
        color: '#e2b497',
        fontSize: 18,
        fontWeight: 'bold',
        // margin: 6,
        textAlign: 'center',
        // padding: 6,
        // borderBottomColor: 'white',
        // borderBottomWidth: 2,
    },
    subTitleContainer: {
        padding: 6,
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
        marginHorizontal: 12,
    },
})