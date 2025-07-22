import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TableOptionsNavigationProp, TableOptionsStackParamList } from "../types/navigation";
import { useEffect, useMemo, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../styles/global";
import { Alert, Button, Image, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeArea } from "../hooks/useSafeArea";
import dayjs from "dayjs";
import { Checkbox } from "react-native-paper";
import { launchImageLibrary } from 'react-native-image-picker';


type DriverDetailsRouteProp = RouteProp<TableOptionsStackParamList, 'DriverDetails'>;

type Driver = {
    id: string;
    documentNumber: string;
    name: string;
    picture: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function DriverDetailsScreen() {
    const navigation = useNavigation<TableOptionsNavigationProp>();
    const route = useRoute<DriverDetailsRouteProp>();
    const { driverId } = route.params;

    const [checked, setChecked] = useState(true);
    const [picture, setPicture] = useState<null | {
        uri?: String;
        fileName?: String;
        type?: String;
    }>(null);

    const { showLoading, hideLoading } = useLoading();
    const { userToken } = useAuth();
    const insets = useSafeArea();
    
    const [driver, setDriver] = useState<Driver | null>(null);
    const [originalDriver, setOriginalDriver] = useState<Driver | null>(null);

    useEffect(() => {
        async function fetchDriverDetails() {
            try {
                showLoading();
                const response = await axios.get(`${API_BASE_URL}/drivers/retrieve/${driverId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

                setDriver(response.data);
                setOriginalDriver(response.data);
            } catch (error) {
                console.error('Failed to fetch driver:', error);
            } finally {
                hideLoading();
            }
        }

        fetchDriverDetails();
    }, [driverId]);

    const hasChanges = useMemo(() => {
        if (!driver || !originalDriver) return false;
        return (
            driver.name !== originalDriver.name ||
            driver.documentNumber !== originalDriver.documentNumber
        );
    }, [driver, originalDriver]);

    const pickImage = async () => {
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

    const saveChanges = async () => {
        try {
            showLoading();

            const formData = new FormData();
            if (picture) {
                formData.append('picture', {
                    uri: picture?.uri,
                    name: picture?.fileName || 'upload.jpg',
                    type: picture?.type || 'image/jpeg'
                });
            }

            if (driver?.documentNumber) {
                formData.append('documentNumber', driver?.documentNumber);
            }
            
            if (driver?.name) {
                formData.append('name', driver?.name);
            }

            formData.append('active', checked);

            const response = await axios.patch(`${API_BASE_URL}/drivers/update/${driverId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            navigation.goBack();
        } catch (error) {
            console.error("Error updating driver:", error);
        } finally {
            hideLoading();
        }
    }

    if (!driver) return <Text style={globalStyles.error}>Driver not found</Text>

    return (
        <View style={[{flex: 1}, insets]}>
            <View style={driverDetailsStyles.container}>
                <Image 
                    source={{ uri: `${API_BASE_URL}/${driver.picture}` }}
                    style={driverDetailsStyles.image}
                    resizeMode="cover"
                />
                <Button 
                    title="Pick an image"
                    onPress={() => pickImage()}
                />
                <TextInput 
                    value={driver.name}
                    style={driverDetailsStyles.textInput}
                    onChangeText={(text) => setDriver((prev) => prev ? { ...prev, name: text } : prev)}
                />
                <TextInput 
                    value={driver.documentNumber}
                    style={driverDetailsStyles.textInput}
                    onChangeText={(text) => setDriver((prev) => prev ? { ...prev, documentNumber: text } : prev)}
                />
                <Checkbox.Item
                    label="Is Active?"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                    style={globalStyles.checkboxItem}
                />
                <Button
                    title="Save Changes"
                    disabled={!hasChanges}
                    onPress={() => saveChanges()}
                />
            </View>
            <View style={globalStyles.timestampView}>
                <Text style={globalStyles.timestampText}>Created At: {dayjs(driver.createdAt).format('YYYY-DD-MM HH:mm')}</Text>
                <Text style={globalStyles.timestampText}>Updated At: {dayjs(driver.updatedAt).format('YYYY-DD-MM HH:mm')}</Text>
            </View>
        </View>
        
    );
}

const driverDetailsStyles = StyleSheet.create({
    image: {
        width: 180,
        height: 180,
        borderRadius: 100,
        backgroundColor: '#ccc',
        marginBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    textInput: {
        borderColor: '#219EBC',
        borderWidth: 1,
        width: 200,
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5
    }
})