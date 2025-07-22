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

    const [isDriver, setIsDriver] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
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
                isAdmin: isAdmin
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (isDriver) {
                await axios.post<CreateResponse>(`${API_BASE_URL}/drivers/create`, {
                    userId: res.data.id,
                    documentNumber: documentNumberRef.current,
                    name: nameRef.current
                }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });

                console.log("Driver res:", res);
            }

            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert("Registration failed", "Invalid input data");
        } finally {
            hideLoading();
        }
    }

    const toggleDriver = () => {
        if (isDriver && !isAdmin) {
            Alert.alert('Validation', 'At least one role must be selected.');
            return;
        }
        setIsDriver(!isDriver);
    };

    const toggleAdmin = () => {
        if (isAdmin && !isDriver) {
        Alert.alert('Validation', 'At least one role must be selected.');
        return;
        }
        setIsAdmin(!isAdmin);
    };

    return (
        <View style={insets}>
            <View style={styles.checkboxRow}>
                <Checkbox.Item
                    label="Is Driver?"
                    status={isDriver ? 'checked' : 'unchecked'}
                    onPress={toggleDriver}
                    style={globalStyles.checkboxItem}
                />
                <Checkbox.Item
                    label="Is Admin?"
                    status={isAdmin ? 'checked' : 'unchecked'}
                    onPress={toggleAdmin}
                    style={globalStyles.checkboxItem}
                />
            </View>
            
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

            {isDriver && (
                <>
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
                </>
            )}

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