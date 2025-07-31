import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Calendar } from 'react-native-calendars';
import { useNavigation } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp } from "../types/navigation";

export default function TimetableCalendarScreen() {
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>TimetableCalendarScreen</Text>
            </View>
        </SafeAreaView>
    )
}