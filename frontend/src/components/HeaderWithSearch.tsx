import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types/navigation";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../context/AuthContext";

export default function HeaderWithSearch() {
    const navigation = useNavigation<NavigationProp>();
    const { logout } = useAuth();

    return (
        <View style={headerWithSearchStyles.headerView}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: '10%' }}
            >
                <Ionicons
                    name="arrow-back-outline"
                    size={24}
                    style={globalStyles.buttonIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate('SearchOverlay')}
                style={headerWithSearchStyles.container}
            >
                <TextInput 
                    pointerEvents="none"
                    editable={false}
                    placeholder="Search..."
                    style={headerWithSearchStyles.input}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={{width: '10%'}}
                onPress={logout}
            >
                <Ionicons
                    name="log-out-outline"
                    size={24}
                    style={globalStyles.buttonIcon}
                />
            </TouchableOpacity>
        </View>
        
    );
}

const headerWithSearchStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        borderColor: '#ddd',
        width: '75%'
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    },
    headerView: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
})