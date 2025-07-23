import React, { useState, useRef } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import { globalStyles } from '../styles/global';
import { useSafeArea } from '../hooks/useSafeArea';
import { CreateResponse } from '../types/api';
import { API_BASE_URL } from '../config/api';
import { useNavigation } from '@react-navigation/native';
import { useLoading } from '../context/LoadingContext';
import { useAuth } from '../context/AuthContext';

export default function DriverRegistration() {
    const navigation = useNavigation();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const nameRef = useRef('');
    const documentNumberRef = useRef('');

    const insets = useSafeArea();

    const registerUser = async () => {
        try {
            showLoading();

            const res = await axios.post<CreateResponse>(`${API_BASE_URL}/users/create`, {
                email: emailRef.current,
                password: passwordRef.current,
                name: nameRef.current,
                documentNumber: documentNumberRef.current,
                isAdmin: isAdmin
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Registration failed", "Invalid input data");
        } finally {
            hideLoading();
        }
    }

    return (
        <View style={insets}>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => (emailRef.current = text)}
                style={globalStyles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => (passwordRef.current = text)}
                style={globalStyles.input}
            />
            <TextInput
                placeholder="Name"
                onChangeText={(text) => (nameRef.current = text)}
                style={globalStyles.input}
            />
            <TextInput
                placeholder="Document Number"
                onChangeText={(text) => (documentNumberRef.current = text)}
                style={globalStyles.input}
            />
            <Checkbox.Item
                label="Is Admin?"
                onPress={() => setIsAdmin(!isAdmin)}
                status={isAdmin ? 'checked' : 'unchecked'}
                style={globalStyles.checkboxItem}
            />

            <Button title="Register" onPress={registerUser} />
        </View>
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