import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function BusRouteDetailsScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>BusRouteRegistrationScreen</Text>
            </View>
        </SafeAreaView>
    )
}