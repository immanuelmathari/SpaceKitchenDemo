import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ onPressOut, icon, color })
{
    return <Pressable onPressOut={onPressOut} android_ripple={{color: '#ccc'}} style={ ({ pressed }) => pressed && styles.pressed}>
        {/* <Ionicons name="star" size={24} color='white' /> */}
        <Ionicons name={icon} size={24} color={color} />
    </Pressable>
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
})