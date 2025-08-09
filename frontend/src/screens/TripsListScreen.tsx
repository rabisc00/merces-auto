import { SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { GenericCardList } from "../components/GenericCardList";
import { Trip } from "../types/trip";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { BusesOptionsNavigationProp, BusStackParamList, UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";
import { fetchTripsByBus, fetchTripsByUser } from "../services/tripService";
import { TripCard } from "../components/cards/TripCard";
import { useCallback, useState } from "react";

type TripsListRouteProp = RouteProp<
    BusStackParamList & UsersStackParamList,
    'BusTripsList' | 'UserTripsList'
>;
export default function TripsListScreen() {
    const { userToken } = useAuth();
    const route = useRoute<TripsListRouteProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();

    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
    
    const { id } = route.params;
    const routeName = route.name;

    useFocusEffect(useCallback(() => {
        setRefreshFlag(prev => !prev);
    }, []))

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <GenericCardList<Trip>
                    fetchData={(page) => 
                        routeName === 'BusTripsList' ? 
                        fetchTripsByBus(id, userToken, page) :
                        fetchTripsByUser(id, userToken, page)
                    }
                    renderItem={(trip) => (
                        <TripCard
                            id={trip.id}
                            numberOfPassengers={trip.numberOfPassengers}
                            date={trip.date}
                            timetable={trip.timetable}
                        />
                    )}
                    keyExtractor={(trip) => trip.id}
                    addButtonText="Add Trip"
                    navigateAdd={() => {
                        if (routeName === 'BusTripsList') {
                            busNavigation.navigate('BusTripRegistration', { id });
                        } else if (routeName === 'UserTripsList') {
                            userNavigation.navigate('UserTripRegistration', { id });
                        }
                    }}
                    refreshFlag={refreshFlag}
                    showAdd={true}
                />
            </View>
        </SafeAreaView>
    )
}