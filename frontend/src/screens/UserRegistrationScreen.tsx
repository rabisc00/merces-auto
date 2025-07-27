import React, { useState, useRef } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { useLoading } from '../context/LoadingContext';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/userService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCreate } from '../types/user';
import InputField from '../components/InputField';

export default function UserRegistrationScreen() {
    const navigation = useNavigation();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [errors, setErrors] = useState<{ 
        email?: string;
        password?: string;
        documentNumber?: string;
        name?: string
    }>({});

    const callRegisterUser = async () => {
        showLoading();

        // const parseResult = userSchema.safeParse({ 
        //     email,
        //     password,
        //     documentNumber,
        //     name
        // });

        // if (!parseResult.success) {
        //     const fieldErrors: typeof errors = {};
        //     parseResult.error.issues.forEach(err => {
        //         const field = err.path[0] as keyof typeof errors;
        //         fieldErrors[field] = err.message;
        //     })

        //     setErrors(fieldErrors);
        //     return;
        // } else {
        //     setErrors({});
        // }

        const user: UserCreate = {
            email,
            password,
            name,
            documentNumber,
            isAdmin
        };

        const registrationValid = await registerUser(user, userToken);
        if (registrationValid) {
            navigation.goBack();
        }
        hideLoading();
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <InputField
                    label="Name"
                    errorMessage={errors.name}
                    required={true}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <InputField
                    label="Document Number"
                    errorMessage={errors.documentNumber}
                    required={true}
                    value={documentNumber}
                    onChangeText={(text) => setDocumentNumber(text)}
                />
                <InputField
                    label="Email"
                    errorMessage={errors.email}
                    required={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <InputField
                    label="Password"
                    errorMessage={errors.password}
                    password={true}
                    required={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Checkbox.Item
                    label="Is Admin?"
                    onPress={() => setIsAdmin(!isAdmin)}
                    status={isAdmin ? 'checked' : 'unchecked'}
                    style={globalStyles.checkboxItem}
                />

                <Button title="Register" onPress={callRegisterUser} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 16
    },
    checkboxItem: {
        flex: 1,
        paddingRight: 8
    }
});