import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";

export default function TripDetailsScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <Text>TripDetailsScreen</Text>
            </View>
        </SafeAreaView>
    )
}