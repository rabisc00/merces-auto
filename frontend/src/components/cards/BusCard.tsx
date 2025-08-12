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

type Props = Bus & {
    onDelete?: () => void;
}

export function BusCard({ id, busNumber, model, inRepair, manufacturingYear, capacity, onDelete }: Props) {
    const navigation = useNavigation<BusesOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin } = useAuth();

    const deleteAction = () => {
        confirm(async () => {
            try {
                showLoading();
                deleteBus(id, userToken);
                onDelete?.();
            } finally {
                hideLoading();
            }
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
                    <Text style={[globalStyles.cardText, globalStyles.boldText]}>{busNumber} | {model || 'Undefined Model'} {manufacturingYear && `(${manufacturingYear})`}</Text>
                    {capacity ? <Text>Capacity: {capacity}</Text> : ''}
                    <Text style={globalStyles.cardText}>{inRepair ? 'In Repair' : 'Available to Use'}</Text>
                </View>
                
                <CardActionButtons 
                    deleteAction={isUserAdmin ? deleteAction : undefined}
                    detailsAction={isUserAdmin ? detailsAction : undefined}
                    tripsAction={tripsAction}
                />
            </View>
        </BaseCard>
    )
}