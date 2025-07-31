import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import { deleteBusRoute } from "../../services/busRouteService";
import { BusRoute } from "../../types/busRoute";
import { confirm } from "../../utils/confirm";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../../types/navigation";
import { Alert, Text, View } from "react-native";
import BaseCard from "../BaseCard";
import { globalStyles } from "../../styles/global";
import CardActionButtons from "../CardActionButtons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function BusRouteCard({ id, lineNumber, origin, destination }: BusRoute) {
    const navigation = useNavigation<NativeStackNavigationProp<BusRouteStackParamList>>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken } = useAuth();
    
    const deleteAction = () => {
        confirm(async () => {
            showLoading();
            await deleteBusRoute(id, userToken);
            hideLoading();

            navigation.navigate('BusRoutesList');
        });
    };

    const detailsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        navigation.navigate('BusRouteDetails', { busRouteId: id });
    };

    const timetablesAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        navigation.navigate('TimetableCalendar', { busRouteId: id });
    }

    return (
        <BaseCard>
            <View style={globalStyles.cardView}>
                <View style={globalStyles.cardView}>
                    <View style={globalStyles.cardContent}>
                        <Text style={globalStyles.boldText}>{lineNumber}</Text>
                        <Text>{origin} <Text style={globalStyles.boldText}>{"-\>"}</Text> {destination}</Text>
                    </View>
                </View>

                <CardActionButtons
                    deleteAction={deleteAction}
                    detailsAction={detailsAction}
                    timetablesAction={timetablesAction}
                />
            </View>
        </BaseCard>
    )
}