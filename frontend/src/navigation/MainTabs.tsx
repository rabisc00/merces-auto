import { RouteProp } from "@react-navigation/native";
import { TabParamList } from "../types/navigation";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import WorkedHoursScreen from "../screens/WorkedHoursScreen";
import TableOptionsNavigator from "./TableOptionsNavigator";

const Tab = createBottomTabNavigator<TabParamList>();

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

export default function MainTabs() {
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