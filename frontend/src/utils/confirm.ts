import { Alert } from "react-native";

export function confirm(message: string,  onConfirm: () => void) {
    Alert.alert(
        'Confirmation',
        message,
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: onConfirm }
        ]
    );
}