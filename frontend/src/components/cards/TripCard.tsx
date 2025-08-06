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

export function TripCard({ id, numberOfPassengers, date, timetable }: Trip) {
    const route = useRoute();
    const busNavigation = useNavigation<BusesOptionsNavigationProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken } = useAuth();

    const currentScreen = route.name;

    const deleteAction = () => {
        confirm(async () => {
            showLoading();
            await deleteTrip(id, userToken);
            hideLoading();

            if (currentScreen === 'BusTripsList') {
                busNavigation.navigate('BusesList')
            } else if (currentScreen === 'UserTripsList' != null) {
                userNavigation.navigate('UsersList');
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
                deleteAction={deleteAction}
                detailsAction={detailsAction}
            />
        </BaseCard>
    )
}