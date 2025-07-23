import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TableOptionsStackParamList } from "../types/navigation";
import TableOptionsScreen from "../screens/TableOptionsList";
import UserDetailsScreen from "../screens/UserDetails";
import UsersList from "../screens/UsersList";
import UserRegistration from "../screens/UserRegistration";
import BusRegistration from "../screens/BusRegistration";
import BusRouteRegistration from "../screens/BusRouteRegistration";

const TableOptionsStack = createNativeStackNavigator<TableOptionsStackParamList>();

export default function TableOptionsNavigator() {
    return (
        <TableOptionsStack.Navigator>
            <TableOptionsStack.Screen
                name="TableOptionsMain"
                component={TableOptionsScreen}
                options={{ 
                    headerShown: false, 
                    headerBackTitle: 'Add List'
                }}
            />
            <TableOptionsStack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={{
                    headerShown: false,
                    headerBackTitle: 'User Details'
                }}
            />
            <TableOptionsStack.Screen
                name="UsersList"
                component={UsersList}
                options={{
                    headerShown: false,
                    headerBackTitle: 'Users List'
                }}
            />
            <TableOptionsStack.Screen
                name="UserRegistration"
                component={UserRegistration}
                options={{
                    headerShown: false,
                    headerBackTitle: 'User Registration'
                }}
            />
            <TableOptionsStack.Screen
                name="BusRegistration"
                component={BusRegistration}
                 options={{
                    headerShown: false,
                    headerBackTitle: 'Bus Registration'
                }}
            />
            <TableOptionsStack.Screen
                name="BusRouteRegistration"
                component={BusRouteRegistration}
                options={{
                    headerShown: false,
                    headerBackTitle: 'Bus Registration'
                }}
            />
        </TableOptionsStack.Navigator>
    );
}