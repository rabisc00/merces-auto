import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSafeArea } from "../hooks/useSafeArea";

export default function BusRegistration() {
    const insets = useSafeArea();

    return (
        <View style={insets}>
            <Text>Bus Registration Page</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: { fontSize: 100 }
});