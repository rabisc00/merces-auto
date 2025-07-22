import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from "../context/AuthContext";
import { TableOptionsStackParamList, AuthStackParamList, RootStackParamList, TabParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import TableOptionsScreen from "../screens/TableOptionsList";
import DriverRegistration from "../screens/DriverRegistration";
import CalendarScreen from "../screens/CalendarScreen";
import WorkedHoursScreen from "../screens/WorkedHoursScreen";
import BusRegistration from "../screens/BusRegistration";
import BusRouteRegistration from "../screens/BusRouteRegistration";
import TimetableRegistration from "../screens/TimetablerRegistration";
import DriversList from "../screens/DriversList";
import DriverDetailsScreen from "../screens/DriverDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const TableOptionsStack = createNativeStackNavigator<TableOptionsStackParamList>();

const getIconName = (routeName: string, focused: boolean): string => {
  const icons: Record<string, { active: string; inactive: string }> = {
    Home: { active: 'home', inactive: 'home-outline' },
    TableOptions: { active: 'apps', inactive: 'apps-outline' },
    Calendar: { active: 'calendar-number', inactive: 'calendar-number-outline' },
    WorkedHours: { active: 'alarm', inactive: 'alarm-outline' }
  };
  
  const icon = icons[routeName];
  if (!icon) {
    console.warn(`No icon defined for route: ${routeName}`);
    return focused ? 'help' : 'help-outline';
  }
  
  return focused ? icon.active : icon.inactive;
};

const navigatorScreenOptions = ({ route }: { route: RouteProp<TabParamList, keyof TabParamList> }):
    BottomTabNavigationOptions => ({ 
        tabBarStyle: {
        backgroundColor: '#8ecae6',
        paddingTop: 10,
        paddingBottom: 10
    }, 
    tabBarIcon: ({ focused, color, size }) => {
        const iconName = getIconName(route.name, focused);
        return <Ionicons name={iconName} size={size} color={color} />
    },
    tabBarLabel: () => null,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: '#219ebc'
});

function TableOptionsNavigator() {
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
                name="DriverDetails"
                component={DriverDetailsScreen}
                options={{
                    headerShown: false,
                    headerBackTitle: 'Driver Details'
                }}
            />
            <TableOptionsStack.Screen
                name="DriversList"
                component={DriversList}
                options={{
                    headerShown: false,
                    headerBackTitle: 'Drivers List'
                }}
            />
            <TableOptionsStack.Screen
                name="DriverRegistration"
                component={DriverRegistration}
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
            <TableOptionsStack.Screen
                name="TimetableRegistration"
                component={TimetableRegistration}
                options={{
                    headerShown: false,
                    headerBackTitle: 'Bus Registration'
                }}
            />
        </TableOptionsStack.Navigator>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={navigatorScreenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Calendar" component={CalendarScreen} options={{
                headerShown: false
            }} />
            <Tab.Screen name="WorkedHours" component={WorkedHoursScreen} options={{
                headerShown: false
            }} />
            <Tab.Screen 
                name="TableOptions" 
                options={{ headerShown: false }}
                component={TableOptionsNavigator} 
            />
        </Tab.Navigator>
    );
}

function AuthScreens() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
        </AuthStack.Navigator>
    )
}

export default function AppNavigator() {
    const { userToken } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { userToken ? (
                    <Stack.Screen
                        name="Main"
                        component={MainTabs}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <Stack.Screen
                        name="Auth"
                        component={AuthScreens}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}