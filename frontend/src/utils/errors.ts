import { Alert } from "react-native";

export default function showError(status: number) {
    let title; let message;

    if (status === 400) {
        title = 'Invalid inputs';
        message = 'Correct the inputs given'
    } else if (status === 401) {
        title = 'Unauthorized';
        message = 'Access token is missing or invalid';
    } else if (status === 403) {
        title = 'Forbidden';
        message = 'You\'re not allowed to access this resource';
    } else if (status === 404) {
        title = 'Not Found';
        message = 'Resource not found';
    } else if (status === 409) {
        title = 'Conflic';
        message = 'Resource already exists';
    } else if (status === 500) {
        title = 'Internal server error';
        message = 'An unexpected error ocurred. Please try again later.';
    } else {
        title = 'Unknown error';
        message = 'Something went wrong';
    }

    Alert.alert(title, message);
}