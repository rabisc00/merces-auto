import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BusRouteStackParamList } from "../types/navigation";
import BusRoutesListScreen from "../screens/BusRoutesListScreen";
import BusRouteRegistration from "../screens/BusRouteRegistrationScreen";
import BusRouteDetailsScreen from "../screens/BusRouteDetailsScreen";

const Stack = createNativeStackNavigator<BusRouteStackParamList>();

export default function BusRouteStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="BusRoutesList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusRoutesList" component={BusRoutesListScreen} />
            <Stack.Screen name="BusRouteRegistration" component={BusRouteRegistration} />
            <Stack.Screen name="BusRouteDetails" component={BusRouteDetailsScreen} />
        </Stack.Navigator>
    )
}