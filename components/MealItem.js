import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

function MealItem( { title, imageUrl, duration, complexity, affordability})
{
    return (
        <View style={styles.mealItem}>
            {/* <Pressable android_ripple={{ color: '#ccc'}} style={( {pressed} ) => [styles.button, pressed ? styles.buttonPressed : null]}> */}
            <Pressable android_ripple={{ color: '#ccc'}} style={( {pressed} ) => pressed ? styles.buttonPressed : null}>
                <View style={styles.innerContainer}>
                <View>
                    {/* <Image source={require('')} /> */}
                    <Image source={{ uri : imageUrl }} style={styles.image}  />
            <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailsItem}>{duration}m</Text>
                    <Text style={styles.detailsItem}>{complexity.toUpperCase()}</Text>
                    <Text style={styles.detailsItem}>{affordability.toUpperCase()}</Text>
                </View>
                </View>
            </Pressable>
        </View>
    )
}

export default MealItem;

const styles = StyleSheet.create({
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden', // w/o this we wound have rounded corners
    },
    mealItem: {
        margin: 16,
        borderRadius: 8,
        // overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width: 8, height: 2},
        shadowRadius: 16,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    image: {
        width: '100%',
        height: 200,

    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    detailsItem: {
        marginHorizontal: 4,
        fontSize: 12,
    }
});