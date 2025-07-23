import BaseCard from "../BaseCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TableOptionsStackParamList } from "../../types/navigation";
import { confirm } from "../../utils/confirm";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import CardActionButtons from "../CardActionButtons";
import { Image, StyleSheet, Text, View } from "react-native";

type DriverCardProps = {
    driverId: string;
    documentNumber: string;
    name: string;
    picture: string;
    active: boolean;
};

export function DriverCard({ driverId, documentNumber, name, picture, active}: DriverCardProps) {
    const navigation = useNavigation<NativeStackNavigationProp<TableOptionsStackParamList>>();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const deleteAction = () => {
        const deleteDriver = async () => {
            try {
                showLoading();
                const response = await axios.delete(`${API_BASE_URL}/drivers/delete/${driverId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                hideLoading();
            } catch (error) {
                console.log(error);
            }
        };

        confirm('Are you sure you want to delete this driver?', deleteDriver)
    };

    const detailsAction = () => {
        navigation.navigate('DriverDetails', { driverId });
    };
    
    return (
        <BaseCard 
            key={driverId} 
            detailsAction={detailsAction}
            deleteAction={deleteAction}
        >
            <View style={driverCardStyles.cardView}>
                <Image 
                    source={{ uri: `${API_BASE_URL}/${picture}` }} 
                    style={driverCardStyles.cardImage}
                    resizeMode="cover"
                />
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                    <Text>{documentNumber}</Text>
                </View>
                <CardActionButtons 
                    deleteAction={deleteAction}
                    detailsAction={detailsAction}
                />
            </View>
        </BaseCard>
    );
}

const driverCardStyles = StyleSheet.create({
    cardView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#ccc',
    }
})