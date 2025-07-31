import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function TimetableListScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>TimetableListScreen</Text>
            </View>
        </SafeAreaView>
    )
}