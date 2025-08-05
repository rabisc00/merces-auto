import { SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";

export default function TripsListScreen() {
    const { userToken } = useAuth();

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <Text>TripsListScreen</Text>
            </View>
        </SafeAreaView>
    )
}