import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from "../context/AuthContext";
import { AddListStackParamList, AuthStackParamList, RootStackParamList, TabParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import AddListScreen from "../screens/AddListScreen";
import UserRegistration from "../screens/UserRegistration";
import CalendarScreen from "../screens/CalendarScreen";
import WorkedHoursScreen from "../screens/WorkedHoursScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AddListStack = createNativeStackNavigator<AddListStackParamList>();

const getIconName = (routeName: string, focused: boolean): string => {
  const icons: Record<string, { active: string; inactive: string }> = {
    Home: { active: 'home', inactive: 'home-outline' },
    AddList: { active: 'add-circle', inactive: 'add-circle-outline' },
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

function AddListNavigator() {
    return (
        <AddListStack.Navigator>
            <AddListStack.Screen
                name="AddListMain"
                component={AddListScreen}
                options={{ 
                    headerShown: false, 
                    headerBackTitle: 'Add List'
                }}
            />
            <AddListStack.Screen
                name="UserRegistration"
                component={UserRegistration}
                options={{
                    headerShown: false,
                    headerBackTitle: 'User Registration'
                }}
            />
        </AddListStack.Navigator>
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
                name="AddList" 
                options={{ headerShown: false }}
                component={AddListNavigator} 
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