import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSafeArea } from "../hooks/useSafeArea";

export default function BusRouteRegistration() {
    const insets = useSafeArea();

    return (
        <View style={insets}>
            <Text>Bus Route Registration Page</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: { fontSize: 100 }
});