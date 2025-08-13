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
import dayjs from "dayjs";

type Props = Trip & {
    onDelete?: () => void;
}

export function TripCard({ id, numberOfPassengers, date, timetable, user, onDelete }: Props) {
    const route = useRoute();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin, userId } = useAuth();

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
                    <Text style={globalStyles.boldText}>{timetable.busRoute.lineNumber} | {date}</Text>
                    <Text>
                        {timetable.busRoute.origin} ({timetable.departureTime.slice(0, 5)}) {'-> '}
                        {timetable.busRoute.destination} ({timetable.arrivalTime.slice(0, 5)})
                    </Text>
                </View>
            </View>

            <CardActionButtons
                deleteAction={isUserAdmin ? deleteAction : undefined}
                detailsAction={isUserAdmin || user.id === userId ? detailsAction : undefined}
            />
        </BaseCard>
    )
}