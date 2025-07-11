import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

export type RootStackParamList = {
    Home: undefined,
    Login: undefined
}

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { userToken } = useAuth();

    return (
        <Stack.Navigator>
            {userToken ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};