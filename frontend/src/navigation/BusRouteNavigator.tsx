import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BusRouteStackParamList } from "../types/navigation";
import BusRoutesListScreen from "../screens/BusRoutesListScreen";
import BusRouteRegistration from "../screens/BusRouteRegistrationScreen";
import BusRouteDetailsScreen from "../screens/BusRouteDetailsScreen";
import TimetableCalendarScreen from "../screens/TimetableCalendarScreen";
import TimetableDetailsScreen from "../screens/TimetableDetailsScreen";
import TimetableListScreen from "../screens/TimetableListScreen";
import TimetableRegistrationScreen from "../screens/TimetableRegistrationScreen";

const Stack = createNativeStackNavigator<BusRouteStackParamList>();

export default function BusRouteStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="BusRoutesList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusRoutesList" component={BusRoutesListScreen} />
            <Stack.Screen name="BusRouteRegistration" component={BusRouteRegistration} />
            <Stack.Screen name="BusRouteDetails" component={BusRouteDetailsScreen} />
            <Stack.Screen name="TimetableCalendar" component={TimetableCalendarScreen} />
            <Stack.Screen name="TimetableDetails" component={TimetableDetailsScreen} />
            <Stack.Screen name="TimetableList" component={TimetableListScreen} />
            <Stack.Screen name="TimetableRegistration" component={TimetableRegistrationScreen} />
        </Stack.Navigator>
    )
}