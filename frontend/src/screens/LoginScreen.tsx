import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { LoginResponse } from "../types/api";
import { globalStyles } from "../styles/global";
import { API_BASE_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const { login, setIsAdmin } = useAuth();
    const emailRef = useRef<string>('');
    const passwordRef = useRef<string>('');

    const handleLogin = async () => {
        try {
            const res = await axios.post<LoginResponse>(`${API_BASE_URL}/users/login`, { 
                email: emailRef.current,
                password: passwordRef.current
            });

            login(res.data.token);
            setIsAdmin(res.data.isAdmin);
            
            passwordRef.current = '';
        } catch (error) {
            console.log(error);
            Alert.alert("Login Failed", "Access Denied");
        }
    };

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <Text>Email:</Text>
                <TextInput onChangeText={(text) => emailRef.current = text} autoCapitalize="none" style={globalStyles.input} />
                <Text>Password:</Text>
                <TextInput onChangeText={(text) => passwordRef.current = text} secureTextEntry style={globalStyles.input} />
            </View>
            <Button title="Login" onPress={handleLogin} />
        </SafeAreaView>
    )
};