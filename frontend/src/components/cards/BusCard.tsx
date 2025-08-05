import { useNavigation } from "@react-navigation/native";
import { Bus } from "../../types/bus";
import BaseCard from "../BaseCard";
import { BusesOptionsNavigationProp } from "../../types/navigation";
import { useLoading } from "../../context/LoadingContext";
import { useAuth } from "../../context/AuthContext";
import { confirm } from "../../utils/confirm";
import { deleteBus } from "../../services/busService";
import { Alert, Text } from "react-native";
import { View } from "react-native";
import CardActionButtons from "../CardActionButtons";
import { globalStyles } from "../../styles/global";

export function BusCard({ id, busNumber, model, inRepair }: Bus) {
    const navigation = useNavigation<BusesOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken } = useAuth();

    const deleteAction = () => {
        confirm(async () => {
            showLoading();
            deleteBus(id, userToken);
            hideLoading();

            navigation.navigate('BusesList');
        })
    };

    const detailsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        navigation.navigate('BusDetails', { busId: id });
    };

    const tripsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        navigation.navigate('BusTripsList', { id });
    }

    return (
        <BaseCard >
            <View style={globalStyles.cardView}>
                <View>
                    <Text style={[globalStyles.cardText, globalStyles.boldText]}>{busNumber}</Text>
                    <Text style={globalStyles.cardText}>{model || 'Undefined model'}</Text>
                    <Text style={globalStyles.cardText}>{inRepair ? 'In Repair' : 'Available to Use'}</Text>
                </View>
                
                <CardActionButtons 
                    deleteAction={deleteAction}
                    detailsAction={detailsAction}
                    tripsAction={tripsAction}
                />
            </View>
        </BaseCard>
    )
}