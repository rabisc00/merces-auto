import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function BusDetailsScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>BusDetailsScreen</Text>
            </View>
        </SafeAreaView>
    )
}