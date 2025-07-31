import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function TimetableRegistrationScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>TimetableRegistrationScreen</Text>
            </View>
        </SafeAreaView>
    )
}