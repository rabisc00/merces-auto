import { useAuth } from "../context/AuthContext";
import { GenericCardList } from "../components/GenericCardList";
import { UserCard } from "../components/cards/UserCard";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UsersOptionsNavigationProp } from "../types/navigation";
import { useCallback, useState } from "react";
import { fetchUsers } from "../services/userService";
import HeaderWithSearch from "../components/HeaderWithSearch";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { User } from "../types/user";

export default function UsersListScreen() {
    const { userToken } = useAuth();
    const navigation = useNavigation<UsersOptionsNavigationProp>();

    const [refreshKey, setRefreshKey] = useState(0);

    useFocusEffect(
        useCallback(() => {
            setRefreshKey(prev => prev + 1)
        }, [])
    );

    return (
        <SafeAreaView style={globalStyles.safeAreaContainer}>
            <HeaderWithSearch />
            <View style={globalStyles.mainContainer}>
                <GenericCardList<User>
                    fetchData={(page) => fetchUsers(page, userToken)}
                    renderItem={(user) => (   
                        <UserCard 
                            id={user.id}
                            documentNumber={user.documentNumber}
                            name={user.name}
                            picture={user.picture}
                            active={user.active}
                            isAdmin={user.isAdmin}
                        />)
                    }
                    keyExtractor={(user) => user.id}
                    addButtonText="Add New User"
                    addIconName="person-add"
                    navigateAdd={() => navigation.navigate('UserRegistration')}
                    refreshKey={refreshKey}
                />
            </View>
        </SafeAreaView>
    )
}