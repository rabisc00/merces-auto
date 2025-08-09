import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function WorkingHoursDetailsScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>WorkingHoursDetails</Text>
            </View>
        </SafeAreaView>
    )
}