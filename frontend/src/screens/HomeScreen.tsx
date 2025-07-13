import { Button, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTypedNavigation } from "../hooks/useTypeNavigation";

export default function HomeScreen() {
    const { logout, isAdmin } = useAuth();
    const navigation = useTypedNavigation();

    const doLogout = () => {
        logout();
    }

    return (
        <View>
            <Text>{isAdmin ? 'I Love You' : 'I Hate You'}</Text>
            <Button title="Logout" onPress={doLogout} />
        </View>
    )
};

const styles = StyleSheet.create({
    text: { fontSize: 100 }
});