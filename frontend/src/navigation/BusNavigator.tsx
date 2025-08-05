import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BusStackParamList } from "../types/navigation";
import BusesListScreen from "../screens/BusesListScreen";
import BusRegistrationScreen from "../screens/BusRegistrationScreen";
import BusDetailsScreen from "../screens/BusDetailsScreen";
import TripsListScreen from "../screens/TripsListScreen";
import TripRegistrationScreen from "../screens/TripRegistrationScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";

const Stack = createNativeStackNavigator<BusStackParamList>();

export default function BusesStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="BusesList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusesList" component={BusesListScreen} />
            <Stack.Screen name="BusRegistration" component={BusRegistrationScreen} />
            <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
            <Stack.Screen name="BusTripsList" component={TripsListScreen} />
            <Stack.Screen name="BusTripRegistration" component={TripRegistrationScreen} />
            <Stack.Screen name="BusTripDetails" component={TripDetailsScreen} />
        </Stack.Navigator>
    );
}