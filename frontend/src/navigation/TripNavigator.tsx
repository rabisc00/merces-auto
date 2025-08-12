import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TripStackParamList } from "../types/navigation";
import TripsListScreen from "../screens/TripsListScreen";
import TripRegistrationScreen from "../screens/TripRegistrationScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";

const Stack = createNativeStackNavigator<TripStackParamList>();

export default function TripStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="TripsList" screenOptions={{headerShown: false}}>
            <Stack.Screen name="TripsList" component={TripsListScreen} />
            <Stack.Screen name="TripsRegistration" component={TripRegistrationScreen} />
            <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
        </Stack.Navigator>
    );
}