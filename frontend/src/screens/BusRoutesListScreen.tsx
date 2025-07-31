import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BusRoutesOptionsNavigationProp } from "../types/navigation";
import { useCallback, useEffect, useState } from "react";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { GenericCardList } from "../components/GenericCardList";
import { BusRoute } from "../types/busRoute";
import { fetchBusRoutes } from "../services/busRouteService";
import { BusRouteCard } from "../components/cards/BusRouteCard";

export default function BusRoutesListScreen() {
    const { userToken } = useAuth();
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();

    const [refreshKey, setRefreshKey] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setRefreshKey(prev => prev + 1);
        }, [])
    );
    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <GenericCardList<BusRoute>
                    fetchData={(page) => fetchBusRoutes(page, userToken)}
                    renderItem={(busRoute) => (
                        <BusRouteCard
                            id={busRoute.id}
                            lineNumber={busRoute.lineNumber}
                            origin={busRoute.origin}
                            destination={busRoute.destination}
                        />
                    )}
                    keyExtractor={(busRoute) => busRoute.id}
                    addButtonText={"Add New Bus Route"}
                    addIconName="trail-sign"
                    navigateAdd={() => navigation.navigate('BusRouteRegistration')}
                    refreshKey={refreshKey}
                />
            </View>
        </SafeAreaView>
    )
}