import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { GenericCardList } from "../components/GenericCardList";
import { UserCard } from "../components/cards/UserCard";
import { useSafeArea } from "../hooks/useSafeArea";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { TableOptionsNavigationProp } from "../types/navigation";
import { useCallback, useState } from "react";

type User = {
    id: string;
    documentNumber: string;
    name: string;
    picture: string;
    active: boolean;
}

type UserInfo = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    users: User[];
};

export default function UsersList() {
    const { userToken } = useAuth();

    const insets = useSafeArea();
    const navigation = useNavigation<TableOptionsNavigationProp>();

    const [refreshKey, setRefreshKey] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setRefreshKey(prev => prev + 1)
        }, [])
    );

    const fetchUsers = async (page: number) => {
        const res = await axios.get(`${API_BASE_URL}/users/retrieve?page=${page}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return {
            data: res.data.records,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage
        };
    };

    const navigateToAddUser = () => {
        navigation.navigate('UserRegistration');
    }

    return (
        <View style={insets}>
            <GenericCardList<User>
                fetchData={fetchUsers}
                renderItem={(user) => (   
                    <UserCard 
                        id={user.id}
                        documentNumber={user.documentNumber}
                        name={user.name}
                        picture={user.picture}
                        active={user.active}
                    />)
                }
                keyExtractor={(user) => user.id}
                addButtonText="Add New User"
                addIconName="person-add"
                navigateAdd={navigateToAddUser}
                refreshKey={refreshKey}
            />
        </View>
    )
}