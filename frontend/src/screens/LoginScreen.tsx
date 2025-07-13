import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { LoginResponse } from "../types/api";

export default function LoginScreen() {
    const { login, setIsAdmin } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post<LoginResponse>('http://localhost:3000/users/login', { email, password });

            login(res.data.token);
            setIsAdmin(res.data.user.isAdmin);

            //navigation.navigate('Home');
        } catch (error) {
            Alert.alert("Login Failed", "Invalid email or password");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Email:</Text>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={styles.input} />
            <Text>Password:</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Login" onPress={handleLogin} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderWidth: 1, borderColor: '#cccccc', marginBottom: 10, padding: 8, borderRadius: 5 }
});