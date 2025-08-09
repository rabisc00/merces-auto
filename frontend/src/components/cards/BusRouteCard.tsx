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

export function BusRouteCard({ id, lineNumber, origin, destination, averageTimeInMinutes, distanceInKm }: BusRoute) {
    const navigation = useNavigation<NativeStackNavigationProp<BusRouteStackParamList>>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin } = useAuth();
    
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
                <View style={globalStyles.cardContent}>
                    <Text style={[globalStyles.cardText, globalStyles.boldText]}>{lineNumber} {`(${distanceInKm} Km | ${averageTimeInMinutes} Minutes)`}</Text>
                    <Text>Origin: {origin}</Text>
                    <Text>Destination: {destination}</Text>
                    <Text></Text>
                </View>

                <CardActionButtons
                    deleteAction={isUserAdmin ? deleteAction : undefined}
                    detailsAction={isUserAdmin ? detailsAction : undefined}
                    timetablesAction={timetablesAction}
                />
            </View>
        </BaseCard>
    )
}