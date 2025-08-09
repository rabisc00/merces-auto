import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UsersStackParamList } from "../types/navigation";
import UsersListScreen from "../screens/UsersListScreen";
import UserRegistrationScreen from "../screens/UserRegistrationScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";
import TripsListScreen from "../screens/TripsListScreen";
import TripRegistrationScreen from "../screens/TripRegistrationScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";
import WorkingHoursListScreen from "../screens/WorkingHoursListScreen";
import WorkingHoursDetailsScreen from "../screens/WorkingHoursDetailsScreen";

const Stack = createNativeStackNavigator<UsersStackParamList>();

export default function UsersStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="UsersList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UsersList" component={UsersListScreen} />
            <Stack.Screen name="UserRegistration" component={UserRegistrationScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="UserTripsList" component={TripsListScreen} />
            <Stack.Screen name="UserTripRegistration" component={TripRegistrationScreen} />
            <Stack.Screen name="UserTripDetails" component={TripDetailsScreen} />
            <Stack.Screen name="UserWorkingHoursList" component={WorkingHoursListScreen} />
            <Stack.Screen name="UserWorkingHoursDetails" component={WorkingHoursDetailsScreen} />
        </Stack.Navigator>
    )
}