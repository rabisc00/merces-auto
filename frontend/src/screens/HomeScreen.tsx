import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTypedNavigation } from "../hooks/useTypeNavigation";
import { useSafeArea } from "../hooks/useSafeArea";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const { logout, isAdmin } = useAuth();
    const navigation = useTypedNavigation();

    const insets = useSafeArea();

    const doLogout = () => {
        logout();
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: '#fff' }}>
            <HeaderWithSearch />
            <Text>{isAdmin ? 'Teste Admin' : 'Teste User'}</Text>
            <Button title="Logout" onPress={doLogout} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    text: { fontSize: 100 }
});