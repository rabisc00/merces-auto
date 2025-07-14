import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTypedNavigation } from "../hooks/useTypeNavigation";
import { useSafeArea } from "../hooks/useSafeArea";

export default function HomeScreen() {
    const { logout, isAdmin } = useAuth();
    const navigation = useTypedNavigation();

    const insets = useSafeArea();

    const doLogout = () => {
        logout();
    }

    return (
        <View style={insets}>
            <Text>{isAdmin ? 'Teste Admin' : 'Teste User'}</Text>
            <Button title="Logout" onPress={doLogout} />
        </View>
    )
};

const styles = StyleSheet.create({
    text: { fontSize: 100 }
});