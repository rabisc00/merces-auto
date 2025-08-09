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
import { BusRouteCard } from "../components/cards/BusRouteCard";
import { BusCard } from "../components/cards/BusCard";

export default function SearchOverlayScreen() {
    const { userToken } = useAuth();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResponse | null>(null);

    const onSearch = async (text: string) => {
        if (text.length > 0) {
            setQuery(text);

            const res = await axios.get(`${API_BASE_URL}/filter?q=${query}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });

            setResults(res.data);
        } else {
            setQuery('');
            setResults(null);
        }
    };

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <View style={globalStyles.mainContainer}>
                <TextInput
                    autoFocus
                    value={query}
                    onChangeText={onSearch}
                    placeholder="Search something..."
                    style={globalStyles.input}
                    underlineColorAndroid="transparent"
                />
                <View style={overlayStyles.listView}>
                    <Text style={overlayStyles.listTitle}>Bus Routes</Text>
                    {
                        results?.routes?.length ? 
                        <FlatList
                            data={results?.routes}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <BusRouteCard
                                    id={item.id}
                                    lineNumber={item.lineNumber}
                                    origin={item.origin}
                                    destination={item.destination}
                                    averageTimeInMinutes={item.averageTimeInMinutes}
                                    distanceInKm={item.distanceInKm}
                                />
                            )}
                        /> :
                        <Text>Not Found</Text>
                    }
                </View>
                <View style={overlayStyles.listView}>
                    <Text style={overlayStyles.listTitle}>Buses</Text>
                    {
                        results?.buses?.length ?
                        <FlatList
                            data={results?.buses}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <BusCard
                                    id={item.id}
                                    busNumber={item.busNumber}
                                    model={item.model}
                                    inRepair={item.inRepair}
                                />
                            )}  
                        /> : 
                        <Text>Not Found</Text>
                    }
                </View>
                <View style={overlayStyles.listView}>
                    <Text style={overlayStyles.listTitle}>Users</Text>
                    {
                        results?.users?.length ?
                        <FlatList
                            data={results?.users}
                            keyExtractor={(item) => item.id}
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
            </View>
        </SafeAreaView>
    );
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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16
    },
    listView: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 16
    }
});