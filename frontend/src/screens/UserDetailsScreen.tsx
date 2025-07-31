import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useMemo, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { globalStyles } from "../styles/global";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { UserDetails, UserUpdate } from "../types/user";
import { pickImage } from "../services/imageService";
import { getUserDetails, saveUserChanges } from "../services/userService";
import { ImageProps } from "../types/image";
import { UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { userUpdateSchema } from "../validations/userSchema";
import InputField from "../components/InputField";
import { showNoChangesAlert } from "../utils/alerts";
import HeaderWithSearch from "../components/HeaderWithSearch";
import Timestamps from "../components/Timestamps";

type UserDetailsRouteProp = RouteProp<UsersStackParamList, 'UserDetails'>;

export default function UserDetailsScreen() {
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();
    const navigation = useNavigation<UsersOptionsNavigationProp>();
    const route = useRoute<UserDetailsRouteProp>();

    const { userId } = route.params;
    
    const [originalUser, setOriginalUser] = useState<UserDetails | null>(null);
    const [picture, setPicture] = useState<ImageProps | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const data = await getUserDetails(userId, userToken);
            setOriginalUser(data);
        };

        showLoading();
        fetchUserDetails();
        hideLoading();
    }, [userId]);

    const callSaveChanges = async (values: UserUpdate) => {
        showLoading();

        if (
            values?.name?.toUpperCase() === originalUser?.name &&
            values?.documentNumber?.toUpperCase() === originalUser?.documentNumber &&
            values.active === originalUser?.active &&
            picture === null
        ) {
            showNoChangesAlert();
        } else {
            const validRequest = await saveUserChanges(userId, values, picture, userToken);
            if (validRequest) {
                navigation.navigate('UsersList');
            }
        }

        hideLoading();
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            {
                originalUser ?
                    <Formik<UserUpdate>
                        initialValues={{ 
                            documentNumber: originalUser?.documentNumber, 
                            name: originalUser?.name, 
                            active: originalUser?.active 
                        }}
                        validationSchema={userUpdateSchema}
                        onSubmit={callSaveChanges}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            values,
                            errors,
                            touched
                        }) => (
                            <View style={globalStyles.editContainer}>
                                <Text><Text style={{ fontWeight: 'bold' }}>Email: </Text>{originalUser.email}</Text>
                                <Image 
                                    source={{ uri: `${API_BASE_URL}/${originalUser.picture}` }}
                                    style={userDetailsStyles.image}
                                    resizeMode="cover"
                                />
                                <Button 
                                    title="Pick an image"
                                    onPress={() => pickImage(setPicture)}
                                />
                                {
                                    picture !== null &&
                                    <Text style={globalStyles.smallText}>Image picked successfully</Text>
                                }

                                <InputField
                                    label="Name"
                                    errorMessage={touched.name && errors.name}
                                    required={true}
                                    value={values.name || ''}
                                    onChangeText={handleChange('name')}
                                />

                                <InputField
                                    label="Document Number"
                                    errorMessage={touched.documentNumber && errors.documentNumber}
                                    required={true}
                                    value={values.documentNumber ? values.documentNumber : ''}
                                    onChangeText={handleChange('documentNumber')}
                                />
                                
                                <Checkbox.Item
                                    label="Active"
                                    status={values.active ? 'checked' : 'unchecked'}
                                    onPress={() => setFieldValue('active', !values.active)}
                                    style={globalStyles.checkboxItem}
                                />

                                <Button
                                    title="Save Changes"
                                    onPress={() => handleSubmit()}
                                />

                                <Timestamps
                                    createdAt={originalUser.createdAt}
                                    updatedAt={originalUser.updatedAt}
                                />
                            </View>
                        )}
                                
                    </Formik> :
                    <Text style={globalStyles.error}>User not found</Text>

            }
        </SafeAreaView>
        
    );
}

const userDetailsStyles = StyleSheet.create({
    image: {
        width: 180,
        height: 180,
        borderRadius: 100,
        backgroundColor: '#ccc',
        marginBottom: 0,
        marginTop: 16
    }
})