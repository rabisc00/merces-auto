import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Calendar, DateData } from 'react-native-calendars';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeaderWithSearch from "../components/HeaderWithSearch";

type TimetableCalendarRouteProp = RouteProp<BusRouteStackParamList, 'TimetableCalendar'>

export default function TimetableCalendarScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<BusRouteStackParamList>>();
    const route = useRoute<TimetableCalendarRouteProp>();

    const { busRouteId } = route.params;

    const handleDayPress = (day: DateData) => {
        navigation.navigate('TimetableList', {
            busRouteId: busRouteId,
            date: day.dateString
        });
    };

    const navigateAdd = () => {
        navigation.navigate('TimetableRegistration', { busRouteId });
    };

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <TouchableOpacity
                    style={globalStyles.buttonWithIcon}
                    onPress={navigateAdd}
                >
                    <Ionicons
                        name='calendar'
                        size={24}
                        style={globalStyles.buttonIcon}
                    />
                    <Text style={globalStyles.buttonWithIconText}>
                        Add New Timetable
                    </Text>
                </TouchableOpacity>
                
                <Calendar
                minDate={new Date().toISOString().split('T')[0]}
                    onDayPress={handleDayPress}
                />
            </View>
        </SafeAreaView>
    )
}