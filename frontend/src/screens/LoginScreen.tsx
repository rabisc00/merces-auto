import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { LoginResponse } from "../types/api";
import { useSafeArea } from "../hooks/useSafeArea";
import { styles } from "../styles/global";
import { API_BASE_URL } from "../config/api";

export default function LoginScreen() {
    const { login, setIsAdmin } = useAuth();
    const emailRef = useRef<string>('');
    const passwordRef = useRef<string>('');

    const insets = useSafeArea();

    const handleLogin = async () => {
        try {
            const res = await axios.post<LoginResponse>(`${API_BASE_URL}/users/login`, { 
                email: emailRef.current,
                password: passwordRef.current
            });

            login(res.data.token);
            setIsAdmin(res.data.user.isAdmin);
            
            passwordRef.current = '';

            //navigation.navigate('Home');
        } catch (error) {
            Alert.alert("Login Failed", "Invalid email or password");
        }
    };

    return (
        <View style={insets}>
            <Text>Email:</Text>
            <TextInput onChangeText={(text) => emailRef.current = text} autoCapitalize="none" style={styles.input} />
            <Text>Password:</Text>
            <TextInput onChangeText={(text) => passwordRef.current = text} secureTextEntry style={styles.input} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
};