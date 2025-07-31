import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BusRouteStackParamList } from "../types/navigation";

type TimetableCalendarRouteProp = RouteProp<BusRouteStackParamList, 'TimetableList'>

export default function TimetableListScreen() {
    const route = useRoute<TimetableCalendarRouteProp>();

    const { busRouteId, date } = route.params;

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>{date}</Text>
            </View>
        </SafeAreaView>
    )
}