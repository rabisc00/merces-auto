import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { GenericCardList } from "../components/GenericCardList";
import { fetchWorkingHoursByCurrentUser, fetchWorkingHoursByUser } from "../services/workingHoursService";
import { useAuth } from "../context/AuthContext";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { UsersOptionsNavigationProp, UsersStackParamList, WorkingHoursOptionsNavigationProp, WorkingHoursStackParamList } from "../types/navigation";
import { useCallback, useState } from "react";
import { WorkingHoursCard } from "../components/cards/WorkingHoursCard";
import { WorkingHours } from "../types/workingHours";

type WorkingHoursListRouteProp = RouteProp<
    WorkingHoursStackParamList & UsersStackParamList,
    'WorkingHoursList' | 'UserWorkingHoursList' 
>;

export default function WorkingHoursListScreen() {
    const route = useRoute<WorkingHoursListRouteProp>();
    const { userToken, userId } = useAuth();
    const workingHoursNavigation = useNavigation<WorkingHoursOptionsNavigationProp>();
    const userNavigation = useNavigation<UsersOptionsNavigationProp>();

    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    const routeName = route.name;
    const { id } = route.params ?? {};

    useFocusEffect(
        useCallback(() => {
            setRefreshFlag(prev => !prev);
        }, [])
    );

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={[globalStyles.mainContainer, { flex: 1}]}>
                {
                    userId ?
                    <GenericCardList<WorkingHours>
                        fetchData={async (page) => {
                            const fetchId = id ?? userId;
                            if (id) {
                                return await fetchWorkingHoursByUser(id, page, userToken);
                            } else {
                                return await fetchWorkingHoursByCurrentUser(1, userToken);
                            }
                        }}
                        renderItem={(workingHours) => (
                            <WorkingHoursCard
                                id={workingHours.id}
                                startTime={workingHours.startTime}
                                endTime={workingHours.endTime}
                                user={workingHours.user}
                                onDelete={() => setRefreshFlag(prev => !prev)}
                            />
                        )}
                        keyExtractor={(workingHours) => String(workingHours.id)}
                        addButtonText="Add New Working Hours"
                        navigateAdd={() => {
                            if (routeName == 'WorkingHoursList') {
                                workingHoursNavigation.navigate('WorkingHoursRegistration');
                            } else if (routeName == 'UserWorkingHoursList') {
                                userNavigation.navigate('UserWorkingHoursRegistration', { id: userId });
                            }
                        }}
                        refreshFlag={refreshFlag}
                        showAdd={true}
                    /> :
                    <Text>User not properly registered</Text>
                }
            </View>
        </SafeAreaView>
    )
}