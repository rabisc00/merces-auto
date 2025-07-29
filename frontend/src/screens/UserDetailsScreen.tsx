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
import { getUserDetails, saveChanges } from "../services/userService";
import { ImageProps } from "../types/image";
import { UsersOptionsNavigationProp, UsersStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { userUpdateSchema } from "../validations/userSchema";
import InputField from "../components/InputField";
import { showNoChangesAlert } from "../utils/alerts";

type UserDetailsRouteProp = RouteProp<UsersStackParamList, 'UserDetails'>;

export default function UserDetailsScreen() {
    const { userToken } = useAuth();
    const navigation = useNavigation<UsersOptionsNavigationProp>();
    const route = useRoute<UserDetailsRouteProp>();

    const { userId } = route.params;

    const { showLoading, hideLoading } = useLoading();
    
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
        if (
            values?.name?.toUpperCase() === originalUser?.name &&
            values?.documentNumber?.toUpperCase() === originalUser?.documentNumber &&
            values.active === originalUser?.active &&
            picture === null
        ) {
            showNoChangesAlert();
            return;
        }

        const data = await saveChanges(userId, values, picture, userToken);
        if (data) {
            navigation.goBack();
        }
    }

    if (!originalUser) return <Text style={globalStyles.error}>User not found</Text>

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
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
                                    <Text style={globalStyles.timestampText}>Image picked successfully</Text>
                                }

                                <InputField
                                    label="Name"
                                    errorMessage={touched.name && errors.name}
                                    required={true}
                                    value={values.name ? values.name : ''}
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
                                    label="Is Active?"
                                    status={values.active ? 'checked' : 'unchecked'}
                                    onPress={() => setFieldValue('active', !values.active)}
                                    style={globalStyles.checkboxItem}
                                />

                                <Button
                                    title="Save Changes"
                                    onPress={() => handleSubmit()}
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
        marginBottom: 0
    }
})