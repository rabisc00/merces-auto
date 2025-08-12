import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../types/navigation";
import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { GenericCardList } from "../components/GenericCardList";
import { Timetable } from "../types/timetable";
import { fetchTimetablesByRoute } from "../services/timetableService";
import { TimetableCard } from "../components/cards/TimetableCard";

type TimetableCalendarRouteProp = RouteProp<BusRouteStackParamList, 'TimetableList'>

export default function TimetableListScreen() {
    const { userToken } = useAuth();
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();
    const route = useRoute<TimetableCalendarRouteProp>();

    const { busRouteId, date } = route.params;

    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    useFocusEffect(
        useCallback(() => {
            setRefreshFlag(prev => !prev);
        }, [])
    );

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <GenericCardList<Timetable>
                    fetchData={() => fetchTimetablesByRoute(busRouteId, date, userToken)}
                    renderItem={(timetable) => (
                        <TimetableCard
                            id={timetable.id}
                            arrivalTime={timetable.arrivalTime}
                            departureTime={timetable.departureTime}
                            days={timetable.days}
                            busRoute={timetable.busRoute}
                            onDelete={() => setRefreshFlag(prev => !prev)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    addButtonText={"Add Timetable"}
                    refreshFlag={refreshFlag}
                />
            </View>
        </SafeAreaView>
    )
}