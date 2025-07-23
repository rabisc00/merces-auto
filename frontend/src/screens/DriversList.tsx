import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { GenericCardList } from "../components/GenericCardList";
import { DriverCard } from "../components/cards/DriverCard";
import { useSafeArea } from "../hooks/useSafeArea";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TableOptionsNavigationProp } from "../types/navigation";
import { useCallback, useState } from "react";

type Driver = {
    id: string;
    documentNumber: string;
    name: string;
    picture: string;
    active: boolean;
}

type DriverInfo = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    drivers: Driver[];
};

export default function DriversList() {
    const { userToken } = useAuth();

    const insets = useSafeArea();
    const navigation = useNavigation<TableOptionsNavigationProp>();

    const [refreshKey, setRefreshKey] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setRefreshKey(prev => prev + 1)
        }, [])
    );

    const fetchDrivers = async (page: number) => {
        const res = await axios.get(`${API_BASE_URL}/drivers/retrieve?page=${page}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return {
            data: res.data.drivers,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage
        };
    };

    const navigateToAddUser = () => {
        navigation.navigate('DriverRegistration');
    }

    return (
        <View style={insets}>
            <GenericCardList<Driver>
                fetchData={fetchDrivers}
                renderItem={(driver) => (   
                    <DriverCard 
                        driverId={driver.id}
                        documentNumber={driver.documentNumber}
                        name={driver.name}
                        picture={driver.picture}
                        active={driver.active}
                    />)
                }
                keyExtractor={(driver) => driver.id}
                addButtonText="Add New User/Driver"
                addIconName="person-add"
                navigateAdd={navigateToAddUser}
                refreshKey={refreshKey}
            />
        </View>
    )
}