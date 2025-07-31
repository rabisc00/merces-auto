import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function TimetableDetailsScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>TimetableDetailsScreen</Text>
            </View>
        </SafeAreaView>
    )
}