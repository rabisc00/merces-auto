import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";

export default function WorkedHoursScreen() {
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>Worked Hours Page</Text>
            </View>
        </SafeAreaView>
    )
}