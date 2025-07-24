import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UsersStackParamList } from "../types/navigation";
import UsersListScreen from "../screens/UsersListScreen";
import UserRegistrationScreen from "../screens/UserRegistrationScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";

const Stack = createNativeStackNavigator<UsersStackParamList>();

export default function UsersStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="UsersList" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UsersList" component={UsersListScreen} />
            <Stack.Screen name="UserRegistration" component={UserRegistrationScreen} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        </Stack.Navigator>
    )
}