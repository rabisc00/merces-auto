import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../types/navigation";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function HeaderWithSearch() {
    const navigation = useNavigation<NavigationProp>();

    return (
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
    );
}

const headerWithSearchStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
    }
})