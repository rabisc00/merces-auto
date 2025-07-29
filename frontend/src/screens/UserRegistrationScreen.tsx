import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { useLoading } from '../context/LoadingContext';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/userService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserCreate } from '../types/user';
import InputField from '../components/InputField';
import { userCreateSchema } from '../validations/userSchema';
import { Formik } from 'formik';

export default function UserRegistrationScreen() {
    const navigation = useNavigation();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const callRegisterUser = async (values: UserCreate) => {
        showLoading();

        const registrationValid = await registerUser(values, userToken);
        if (registrationValid) {
            navigation.goBack();
        }
        hideLoading();
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <Formik<UserCreate>
                initialValues={{ name: '', documentNumber: '', email: '', password: '', isAdmin: false}}
                validationSchema={userCreateSchema}
                onSubmit={callRegisterUser}
            >
                {({
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    values,
                    errors,
                    touched
                }) => (
                    <View style={globalStyles.mainContainer}>
                        <InputField
                            label="Name"
                            errorMessage={touched.name && errors.name}
                            required={true}
                            value={values.name}
                            onChangeText={handleChange('name')}
                        />
                        <InputField
                            label="Document Number"
                            errorMessage={touched.documentNumber && errors.documentNumber}
                            required={true}
                            value={values.documentNumber}
                            onChangeText={handleChange('documentNumber')}
                        />
                        <InputField
                            label="Email"
                            errorMessage={touched.email && errors.email}
                            required={true}
                            value={values.email}
                            onChangeText={handleChange('email')}
                        />
                        <InputField
                            label="Password"
                            errorMessage={touched.password && errors.password}
                            password={true}
                            required={true}
                            value={values.password}
                            onChangeText={handleChange('password')}
                        />
                        <Checkbox.Item
                            label="Is Admin?"
                            onPress={() => setFieldValue('isAdmin', !values.isAdmin)}
                            status={values.isAdmin ? 'checked' : 'unchecked'}
                            style={globalStyles.checkboxItem}
                        />
                        <Button title="Register" onPress={() => handleSubmit()} />
                    </View>
                )}
            </Formik>
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