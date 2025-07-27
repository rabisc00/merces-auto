import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { LoginResponse } from "../types/api";
import { globalStyles } from "../styles/global";
import { API_BASE_URL } from "../config/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { userLogin } from "../services/userService";
import InputField from "../components/InputField";

export default function LoginScreen() {
    const { login, setIsAdmin } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <InputField
                    label="Email"
                    required={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <InputField
                    label="Password"
                    required={false}
                    password={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button title="Login" onPress={() => userLogin(email, password, login, setIsAdmin)} />
            </View>
        </SafeAreaView>
    )
};