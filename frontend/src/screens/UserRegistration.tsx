import axios from "axios"
import { useRef, useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

export default function UserRegistration() {
    const emailRef = useRef<string>('');
    const usernameRef = useRef<string>('');
    const passwordRef = useRef<string>('');
    const adminRef = useRef<boolean>(false);

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
            console.log(error);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(text) => (emailRef.current = text)}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => (passwordRef.current = text)}
            />
            <Button title="Register" onPress={handleRegistration} />
        </View>
    );
};