import axios from "axios"
import { useRef, useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { useSafeArea } from "../hooks/useSafeArea";
import { styles } from "../styles/global";

export default function UserRegistration() {
    const emailRef = useRef<string>('');
    const usernameRef = useRef<string>('');
    const passwordRef = useRef<string>('');
    const adminRef = useRef<boolean>(false);

    const insets = useSafeArea();

    const handleRegistration = async () => {
        try {
            const res = await axios.post('http://localhost:3000/users/register', {
                email: emailRef.current,
                username: usernameRef.current,
                password: passwordRef.current,
                admin: adminRef.current
            });

            passwordRef.current = '';
        } catch (error) {
            Alert.alert("Login Failed", "Invalid email or password");
            console.error('Login erorr', error);
        }
    };

    return (
        <View style={insets}>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) => (emailRef.current = text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => (passwordRef.current = text)}
                style={styles.input}
            />
            <Button title="Register" onPress={handleRegistration} />
        </View>
    );
};