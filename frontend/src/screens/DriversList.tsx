import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { GenericCardList } from "../components/GenericCardList";
import { DriverCard } from "../components/cards/DriverCard";
import { useSafeArea } from "../hooks/useSafeArea";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TableOptionsNavigationProp } from "../types/navigation";

type Driver = {
    id: string;
    documentNumber: string;
    name: string;
    picture: string;
    active: boolean;
}

export default function DriversList() {
    const { userToken } = useAuth();

    const insets = useSafeArea();
    const navigation = useNavigation<TableOptionsNavigationProp>();

    const fetchDrivers = async (page: number): Promise<Driver[]> => {
        const res = await axios.get(`${API_BASE_URL}/drivers/retrieve`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return res.data.drivers;
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
                    />
                )}
                keyExtractor={(driver) => driver.id}
                addButtonText="Add New User/Driver"
                addIconName="person-add"
                navigateAdd={navigateToAddUser}
            />
        </View>
    )
}