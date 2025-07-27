import { Alert } from "react-native";

export default function showError(status: number) {
    if (status === 401) {
        Alert.alert('Access denied', 'Access token is missing or invalid');
    } else if (status === 403) {
        Alert.alert()
    }
}