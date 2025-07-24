import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SearchResponse } from "../types/api";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { UserCard } from "../components/cards/UserCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";

export default function SearchOverlayScreen() {
    const { userToken } = useAuth();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResponse | null>(null);

    const onSearch = async (text: string) => {
        setQuery(text);

        const results = await axios.get(`${API_BASE_URL}/filter?q=${query}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        setResults(results.data);
    }

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <TextInput
                    autoFocus
                    value={query}
                    onChangeText={onSearch}
                    placeholder="Search something..."
                />
                <Text style={overlayStyles.listTitle}>Bus Routes</Text>
                <Text style={overlayStyles.listTitle}>Buses</Text>
                <Text style={overlayStyles.listTitle}>Users</Text>
                {
                    results?.users?.length ?
                    <FlatList
                        data={results?.users}
                        keyExtractor={(item, _) => item.id}
                        renderItem={({ item }) => (
                            <UserCard
                                id={item.id}
                                documentNumber={item.documentNumber}
                                name={item.name}
                                picture={item.picture}
                                active={item.active}
                                isAdmin={item.isAdmin}
                            />
                        )}
                    /> :
                    <Text>Not Found</Text>
                }
            </View>
        </SafeAreaView>
    )
}

const overlayStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 16
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16
    },
    result: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    noResult: {
        padding: 12,
        color: '#aaa',
        textAlign: 'center'
    },
    listTitle: {
        fontWeight: 'black'
    }
});