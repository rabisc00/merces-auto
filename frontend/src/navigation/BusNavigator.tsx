import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BusStackParamList } from "../types/navigation";
import BusesListScreen from "../screens/BusesListScreen";
import BusRegistrationScreen from "../screens/BusRegistrationScreen";
import BusDetailsScreen from "../screens/BusDetailsScreen";

const Stack = createNativeStackNavigator<BusStackParamList>();

export default function BusesStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="BusesList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BusesList" component={BusesListScreen} />
            <Stack.Screen name="BusRegistration" component={BusRegistrationScreen} />
            <Stack.Screen name="BusDetails" component={BusDetailsScreen} />
        </Stack.Navigator>
    );
}