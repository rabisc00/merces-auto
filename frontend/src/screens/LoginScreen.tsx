import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, View } from "react-native";
import { globalStyles } from "../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { userLogin } from "../services/userService";
import InputField from "../components/InputField";

export default function LoginScreen() {
    const { login, setIsAdmin, setUserId } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const loginWrapper = async () => {
        const data = await userLogin(email, password);
        if (data) {
            login(data.token);
            setUserId(data.id);
            setIsAdmin(data.isAdmin);
        }
    };

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

                <Button title="Login" onPress={loginWrapper} />
            </View>
        </SafeAreaView>
    )
};