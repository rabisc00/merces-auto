import { useNavigation, useRoute } from "@react-navigation/native";
import { Trip } from "../../types/trip";
import { Alert, Text, View } from "react-native";
import { BusesOptionsNavigationProp, UsersOptionsNavigationProp } from "../../types/navigation";
import { confirm } from "../../utils/confirm";
import { useLoading } from "../../context/LoadingContext";
import { deleteTrip } from "../../services/tripService";
import { useAuth } from "../../context/AuthContext";
import BaseCard from "../BaseCard";
import { globalStyles } from "../../styles/global";
import CardActionButtons from "../CardActionButtons";

type Props = Trip & {
    onDelete?: () => void;
}

export function TripCard({ id, numberOfPassengers, date, timetable, onDelete }: Props) {
    const route = useRoute();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin } = useAuth();

    const currentScreen = route.name;

    const deleteAction = () => {
        confirm(async () => {
            try {
                showLoading();
                await deleteTrip(id, userToken);

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

        if (currentScreen === 'BusTripsList') {
            busNavigation.navigate('BusTripDetails', { tripId: id })
        } else if (currentScreen === 'UserTripsList') {
            userNavigation.navigate('UserTripDetails', { tripId: id });
        }
    };

    return (
        <BaseCard>
            <View style={globalStyles.cardView}>
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.boldText}>{date}</Text>
                    <Text>
                        {timetable.busRoute.lineNumber}: {timetable.busRoute.origin} 
                        ({timetable.departureTime}) {'->'} 
                        {timetable.busRoute.destination} ({timetable.arrivalTime})
                    </Text>
                </View>
            </View>

            <CardActionButtons
                deleteAction={isUserAdmin ? deleteAction : undefined}
                detailsAction={isUserAdmin ? detailsAction : undefined}
            />
        </BaseCard>
    )
}