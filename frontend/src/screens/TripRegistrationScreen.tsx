import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function TripRegistrationScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>TripRegistrationScreen</Text>
            </View>
        </SafeAreaView>
    );
}