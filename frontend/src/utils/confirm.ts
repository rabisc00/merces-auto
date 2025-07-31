import { Alert } from "react-native";

export function confirm(onConfirm: () => void) {
    Alert.alert(
        'Confirmation',
        'Are you sure you want to delete this entry?',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'OK', onPress: onConfirm }
        ]
    );
}