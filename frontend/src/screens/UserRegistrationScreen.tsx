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

export default function UserRegistrationScreen() {
    const navigation = useNavigation();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');

    const callRegisterUser = async () => {
        const user: UserCreate = {
            email,
            password,
            name,
            documentNumber,
            isAdmin
        };

        await registerUser(user, userToken, showLoading, hideLoading);
        navigation.goBack();
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    style={globalStyles.input}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                    style={globalStyles.input}
                />
                <TextInput
                    placeholder="Name"
                    onChangeText={setName}
                    style={globalStyles.input}
                />
                <TextInput
                    placeholder="Document Number"
                    onChangeText={setDocumentNumber}
                    style={globalStyles.input}
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