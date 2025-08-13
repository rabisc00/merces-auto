import { useNavigation } from "@react-navigation/native";
import { Timetable } from "../../types/timetable";
import { BusRoutesOptionsNavigationProp, BusRouteStackParamList } from "../../types/navigation";
import { useLoading } from "../../context/LoadingContext";
import { useAuth } from "../../context/AuthContext";
import { confirm } from "../../utils/confirm";
import { deleteTimetable } from "../../services/timetableService";
import { Alert, Text, View } from "react-native";
import BaseCard from "../BaseCard";
import { globalStyles } from "../../styles/global";
import CardActionButtons from "../CardActionButtons";
import { daysOfTheWeek } from "../../const/days";

type Props = Timetable & {
    onDelete?: () => void;
}

export function TimetableCard({ id,  arrivalTime, departureTime, days, busRoute, onDelete }: Props) {
    const navigation = useNavigation<BusRoutesOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin } = useAuth();

    const deleteAction = () => {
        confirm(async () => {
            try {
                showLoading();
                deleteTimetable(id, userToken);
                onDelete?.();
            } finally {
                hideLoading();
            }
        });
    };

    const detailsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        navigation.navigate('TimetableDetails', { timetableId: id });
    };

    return (
        <BaseCard>
            <View style={globalStyles.cardView}>
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.cardText}><Text style={globalStyles.boldText}>{busRoute.lineNumber}:</Text> {busRoute.origin} -{'>'} {busRoute.destination}</Text>
                    <Text style={globalStyles.cardText}><Text style={globalStyles.boldText}>Arrival:</Text> {arrivalTime}</Text>
                    <Text style={globalStyles.cardText}><Text style={globalStyles.boldText}>Departure:</Text> {departureTime}</Text>
                </View>
            </View>

            <CardActionButtons
                deleteAction={isUserAdmin ? deleteAction : undefined}
                detailsAction={isUserAdmin ? detailsAction : undefined}
            />
        </BaseCard>
    )
}