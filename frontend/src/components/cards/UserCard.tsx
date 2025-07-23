import BaseCard from "../BaseCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { confirm } from "../../utils/confirm";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import CardActionButtons from "../CardActionButtons";
import { Image, StyleSheet, Text, View } from "react-native";
import { deleteUser } from "../../services/userService";
import { TableOptionsNavigationProp } from "../../types/navigation";
import { User } from "../../types/user";

export function UserCard({ id, documentNumber, name, picture, active}: User) {
    const navigation = useNavigation<TableOptionsNavigationProp>();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const deleteAction = () => {
        if (!userToken) {
            console.warn('No token available');
            return;
        }
        confirm('Are you sure you want to delete this user?', () => {
            deleteUser(id, userToken, showLoading, hideLoading);
        })
    };

    const detailsAction = () => {
        navigation.navigate('UserDetails', { userId: id });
    };
    
    return (
        <BaseCard 
            key={id} 
            detailsAction={detailsAction}
            deleteAction={deleteAction}
        >
            <View style={userCardStyles.cardView}>
                <Image 
                    source={{ uri: `${API_BASE_URL}/${picture}` }} 
                    style={userCardStyles.cardImage}
                    resizeMode="cover"
                />
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                    <Text>{documentNumber}</Text>
                </View>
                <CardActionButtons 
                    deleteAction={deleteAction}
                    detailsAction={detailsAction}
                />
            </View>
        </BaseCard>
    );
}

const userCardStyles = StyleSheet.create({
    cardView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#ccc',
    }
})