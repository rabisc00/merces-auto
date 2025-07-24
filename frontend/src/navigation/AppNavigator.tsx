import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList } from '../types/navigation';
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./MainTabs";
import AuthScreens from "./AuthScreens";
import SearchOverlayScreen from "../screens/SearchOverlayScreen";
import UserDetailsScreen from "../screens/UserDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { userToken } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                { userToken ? (
                    <>
                        <Stack.Screen
                            name="Main"
                            component={MainTabs}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="SearchOverlay"
                            component={SearchOverlayScreen}
                            options={{ presentation: 'modal', headerShown: false}}
                        />
                        <Stack.Screen 
                            name="UserDetails" 
                            component={UserDetailsScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                    
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