import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSafeArea } from "../hooks/useSafeArea";

export default function TimetableRegistration() {
    const insets = useSafeArea();

    return (
        <View style={insets}>
            <Text>Timetable Registration Page</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: { fontSize: 100 }
});