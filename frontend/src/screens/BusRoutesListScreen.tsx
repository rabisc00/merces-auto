import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function BusRoutesListScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>BusRouteListScreen</Text>
            </View>
        </SafeAreaView>
    )
}