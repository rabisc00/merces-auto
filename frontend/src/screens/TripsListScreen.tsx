import { SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { GenericCardList } from "../components/GenericCardList";
import { Trip } from "../types/trip";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { BusesOptionsNavigationProp, BusStackParamList, TripsOptionsNavigationProp, TripStackParamList, UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";
import { fetchTripsByBus, fetchTripsByUser } from "../services/tripService";
import { TripCard } from "../components/cards/TripCard";
import { useCallback, useState } from "react";

type TripsListRouteProp = RouteProp<
    BusStackParamList & UsersStackParamList & TripStackParamList,
    'BusTripsList' | 'UserTripsList' | 'TripsList'
>;
export default function TripsListScreen() {
    const { userToken, userId } = useAuth();
    const route = useRoute<TripsListRouteProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();
    const tripNavigation = useNavigation<TripsOptionsNavigationProp>();

    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
    
    const { id } = route.params ?? {};
    const routeName = route.name;

    useFocusEffect(useCallback(() => {
        setRefreshFlag(prev => !prev);
    }, []))

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <GenericCardList<Trip>
                    fetchData={async (page) => {
                        if (routeName === 'UserTripsList' && id != null) {
                            return await fetchTripsByUser(id, userToken, page)
                        } else if (routeName === 'BusTripsList' && id != null) {
                            return await fetchTripsByBus(id, userToken, 1);
                        } else {
                            return await fetchTripsByUser(userId ?? '', userToken, 1);
                        }
                    }}
                    renderItem={(trip) => (
                        <TripCard
                            id={trip.id}
                            numberOfPassengers={trip.numberOfPassengers}
                            date={trip.date}
                            timetable={trip.timetable}
                            user={trip.user}
                            onDelete={() => setRefreshFlag(prev => !prev)}
                        />
                    )}
                    keyExtractor={(trip) => trip.id}
                    addButtonText="Add Trip"
                    navigateAdd={() => {
                        if (routeName === 'BusTripsList' && id != null) {
                            busNavigation.navigate('BusTripRegistration', { id });
                        } else if (routeName === 'UserTripsList' && id != null) {
                            userNavigation.navigate('UserTripRegistration', { id });
                        } else if (routeName === 'TripsList' && userId != null) {
                            tripNavigation.navigate('TripsRegistration', { id: userId })
                        }
                    }}
                    refreshFlag={refreshFlag}
                    showAdd={true}
                />
            </View>
        </SafeAreaView>
    )
}