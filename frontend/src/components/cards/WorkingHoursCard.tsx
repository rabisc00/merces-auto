import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { WorkingHours } from "../../types/workingHours";
import { UsersOptionsNavigationProp, UsersStackParamList, WorkingHoursOptionsNavigationProp, WorkingHoursStackParamList } from "../../types/navigation";
import { useLoading } from "../../context/LoadingContext";
import { useAuth } from "../../context/AuthContext";
import { confirm } from "../../utils/confirm";
import { deleteWorkingHours } from "../../services/workingHoursService";
import { Alert, Text, View } from "react-native";
import BaseCard from "../BaseCard";
import { globalStyles } from "../../styles/global";
import CardActionButtons from "../CardActionButtons";

type Props = WorkingHours & {
    onDelete?: () => void;
};

type WorkingHoursListRouteProp = RouteProp<
    WorkingHoursStackParamList & UsersStackParamList,
    'WorkingHoursList' | 'UserWorkingHoursList' 
>;

export function WorkingHoursCard({ id, startTime, endTime, user, onDelete }: Props) {
    const route = useRoute<WorkingHoursListRouteProp>();
    const workingHoursNavigator = useNavigation<WorkingHoursOptionsNavigationProp>();
    const userNavigator = useNavigation<UsersOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin } = useAuth();

    const routeName = route.name;

    const deleteAction = async () => {
        confirm(async () => {
            try {
                showLoading();
                deleteWorkingHours(id, userToken);
                onDelete?.();
            } finally {
                hideLoading();
            }
        })
    };

    const detailsAction = async () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        if (routeName == 'WorkingHoursList') {
            workingHoursNavigator.navigate('WorkingHoursDetails', { workingHoursId: id });
        } else if (routeName == 'UserWorkingHoursList') {
            userNavigator.navigate('UserWorkingHoursDetails', { workingHoursId: id });
        }
    };

    return (
        <BaseCard>
            <View style={globalStyles.cardView}>
                <View style={globalStyles.cardContent}>
                    <Text style={globalStyles.boldText}>{user.name} | {user.documentNumber}</Text>
                    <Text>${startTime} - {endTime}</Text>
                </View>
            </View>

            <CardActionButtons
                detailsAction={isUserAdmin ? detailsAction : undefined}
                deleteAction={isUserAdmin ? deleteAction : undefined}
            />
        </BaseCard>
    )
}