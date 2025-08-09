import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkingHoursStackParamList } from "../types/navigation";
import WorkingHoursListScreen from "../screens/WorkingHoursListScreen";
import WorkingHoursRegistrationScreen from "../screens/WorkingHoursRegistrationScreen";
import WorkingHoursDetails from "../screens/WorkingHoursDetailsScreen";
import WorkingHoursDetailsScreen from "../screens/WorkingHoursDetailsScreen";

const Stack = createNativeStackNavigator<WorkingHoursStackParamList>();

export function WorkingHoursStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="WorkingHoursList" screenOptions={{headerShown: false}}>
            <Stack.Screen name="WorkingHoursList" component={WorkingHoursListScreen} />
            <Stack.Screen name="WorkingHoursRegistration" component={WorkingHoursRegistrationScreen} />
            <Stack.Screen name="WorkingHoursDetails" component={WorkingHoursDetailsScreen} />
        </Stack.Navigator>
    )
}