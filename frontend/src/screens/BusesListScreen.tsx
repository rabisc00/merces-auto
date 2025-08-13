import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BusesOptionsNavigationProp } from "../types/navigation";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { GenericCardList } from "../components/GenericCardList";
import { Bus } from "../types/bus";
import { fetchBuses } from "../services/busService";
import { BusCard } from "../components/cards/BusCard";

export default function BusesListScreen() {
    const { userToken, isUserAdmin } = useAuth();
    const navigation = useNavigation<BusesOptionsNavigationProp>();

    const [refreshFlag, setRefreshFlag] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setRefreshFlag(prev => !prev);
        }, [])
    );

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <GenericCardList<Bus>
                    fetchData={(page) => fetchBuses(page, userToken)}
                    renderItem={(bus) => (
                        <BusCard
                            id={bus.id}
                            busNumber={bus.busNumber}
                            model={bus.model}
                            inRepair={bus.inRepair}
                            manufacturingYear={bus.manufacturingYear}
                            capacity={bus.capacity}
                            onDelete={() => setRefreshFlag(prev => !prev)}
                        />
                    )}
                    keyExtractor={(bus) => bus.id}
                    addButtonText="Add New Bus"
                    navigateAdd={isUserAdmin ? (() => navigation.navigate('BusRegistration')) : undefined}
                    refreshFlag={refreshFlag}
                    showAdd={true}
                />
            </View>
        </SafeAreaView>
    )
}