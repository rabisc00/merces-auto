import { RouteProp } from "@react-navigation/native";
import { TabParamList } from "../types/navigation";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import UsersStackNavigator from "./UserNavigator";
import BusesStackNavigator from "./BusNavigator";
import BusRouteStackNavigator from "./BusRouteNavigator";
import { useAuth } from "../context/AuthContext";
import { WorkingHoursStackNavigator } from "./WorkingHoursNavigator";

const Tab = createBottomTabNavigator<TabParamList>();

const getIconName = (routeName: string, focused: boolean): string => {
  const icons: Record<string, { active: string; inactive: string }> = {
    BusRoutes: { active: 'trail-sign', inactive: 'trail-sign-outline' },
    WorkingHours: { active: 'alarm', inactive: 'alarm-outline' },
    Buses: { active: 'bus', inactive: 'bus-outline' },
    Users: { active: 'person', inactive: 'person-outline' }
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
        paddingBottom: 10,
        marginTop: 0
    }, 
    tabBarIcon: ({ focused, color, size }) => {
        const iconName = getIconName(route.name, focused);
        return <Ionicons name={iconName} size={size} color={color} />
    },
    tabBarLabel: () => null,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: '#219ebc'
});

export default function MainTabs() {
    const { isUserAdmin } = useAuth();

    return (
        <Tab.Navigator screenOptions={navigatorScreenOptions}>
            <Tab.Screen name="BusRoutes" component={BusRouteStackNavigator} options={{
                headerShown: false
            }} />
            <Tab.Screen name="WorkingHours" component={WorkingHoursStackNavigator} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Buses" component={BusesStackNavigator} options={{
                headerShown: false
            }} />
            {isUserAdmin &&
                <Tab.Screen name="Users" component={UsersStackNavigator} options={{
                    headerShown: false
                }} /> 
            }
            
        </Tab.Navigator>
    );
};