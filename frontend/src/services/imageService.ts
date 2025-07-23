import { Alert, PermissionsAndroid, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { ImageProps } from "../types/image";

export const pickImage = async (setPicture: (imageProps: ImageProps) => void) => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Media Library Permission',
                    message: 'App needs access to your media library to upload a picture.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK'
                }
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission Denied', 'Media access is required to select an image.');
                return;
            }
        }

        const result = await launchImageLibrary({ 
            mediaType: 'photo', 
            selectionLimit: 1
        });

        if (result.didCancel) return;

        if (result.assets && result.assets.length > 0) {
            const file = result.assets[0];
            setPicture({
                uri: file.uri,
                fileName: file.fileName,
                type: file.type
            });
        }
    } catch (error) {
        console.error('Error picking image:', error);
    }
};