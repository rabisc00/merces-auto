import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../styles/global";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeArea } from "../hooks/useSafeArea";
import dayjs from "dayjs";
import { Checkbox } from "react-native-paper";
import { User } from "../types/user";
import { pickImage } from "../services/imageService";
import { saveChanges } from "../services/userService";
import { ImageProps } from "../types/image";
import { UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";

type UserDetailsRouteProp = RouteProp<UsersStackParamList, 'UserDetails'>;

export default function UserDetailsScreen() {
    const { userToken } = useAuth();
    const navigation = useNavigation<UsersOptionsNavigationProp>();
    const route = useRoute<UserDetailsRouteProp>();

    const { userId } = route.params;

    const { showLoading, hideLoading } = useLoading();
    const insets = useSafeArea();
    
    const [user, setUser] = useState<User | null>(null);
    const [originalUser, setOriginalUser] = useState<User | null>(null);
    const [picture, setPicture] = useState<ImageProps | null>(null);

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                showLoading();
                const response = await axios.get(`${API_BASE_URL}/users/retrieve/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

                setUser(response.data);
                setOriginalUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                hideLoading();
            }
        }

        fetchUserDetails();
    }, [userId]);

    const hasChanges = useMemo(() => {
        if (!user || !originalUser) return false;
        return (
            user.name !== originalUser.name ||
            user.documentNumber !== originalUser.documentNumber ||
            user.active !== originalUser.active ||
            picture !== null
        );
    }, [user, originalUser, picture]);

    if (!user) return <Text style={globalStyles.error}>User not found</Text>

    return (
        <View style={[{flex: 1}, insets]}>
            <View style={userDetailsStyles.container}>
                <Image 
                    source={{ uri: `${API_BASE_URL}/${user.picture}` }}
                    style={userDetailsStyles.image}
                    resizeMode="cover"
                />
                <Button 
                    title="Pick an image"
                    onPress={() => pickImage(setPicture)}
                />
                {
                    picture !== null &&
                    <Text style={globalStyles.timestampText}>Image picked successfully</Text>
                }
                <View style={globalStyles.textAndInput}>
                    <Text style={{marginRight: 8}}>Name:</Text>
                    <TextInput 
                        value={user.name}
                        style={userDetailsStyles.textInput}
                        onChangeText={(text) => setUser((prev) => prev ? { ...prev, name: text } : prev)}
                    />
                </View>
                
                <View style={globalStyles.textAndInput}>
                    <Text style={{marginRight: 8}}>Document Number:</Text>
                    <TextInput 
                        value={user.documentNumber}
                        style={userDetailsStyles.textInput}
                        onChangeText={(text) => setUser((prev) => prev ? { ...prev, documentNumber: text } : prev)}
                    />
                </View>
                
                <Checkbox.Item
                    label="Is Active?"
                    status={user.active ? 'checked' : 'unchecked'}
                    onPress={() => setUser((prev) => prev ? {...prev, active: !prev.active} : prev)}
                    style={globalStyles.checkboxItem}
                />
                <Button
                    title="Save Changes"
                    disabled={!hasChanges}
                    onPress={() => saveChanges(
                        user,
                        picture,
                        userToken,
                        showLoading,
                        hideLoading,
                        navigation
                    )}
                />
            </View>
            <View style={globalStyles.timestampView}>
                <Text style={globalStyles.timestampText}>Created At: {dayjs(user.createdAt).format('YYYY-DD-MM HH:mm')}</Text>
                <Text style={globalStyles.timestampText}>Updated At: {dayjs(user.updatedAt).format('YYYY-DD-MM HH:mm')}</Text>
            </View>
        </View>
        
    );
}

const userDetailsStyles = StyleSheet.create({
    image: {
        width: 180,
        height: 180,
        borderRadius: 100,
        backgroundColor: '#ccc',
        marginBottom: 0
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