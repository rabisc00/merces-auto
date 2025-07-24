import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";

export default function BusRegistration() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>Bus Registration Page</Text>
            </View>
        </SafeAreaView>
    )
}