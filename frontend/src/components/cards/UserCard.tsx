import BaseCard from "../BaseCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { confirm } from "../../utils/confirm";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import { useLoading } from "../../context/LoadingContext";
import CardActionButtons from "../CardActionButtons";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { deleteUser } from "../../services/userService";
import { UsersOptionsNavigationProp } from "../../types/navigation";
import { User } from "../../types/user";
import { Grayscale } from "react-native-color-matrix-image-filters";

export function UserCard({ id, documentNumber, name, picture, isAdmin, active }: User) {
    const navigation = useNavigation<UsersOptionsNavigationProp>();
    const { userToken } = useAuth();
    const { showLoading, hideLoading } = useLoading();

    const deleteAction = () => {
        if (!userToken) {
            console.warn('No token available');
            return;
        }
        confirm('Are you sure you want to delete this user?', async () => {
            await deleteUser(id, userToken, showLoading, hideLoading);
        })
    };

    const detailsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }
        
        navigation.navigate('UserDetails', { userId: id });
    };
    
    return (
        <BaseCard 
            key={id} 
            detailsAction={detailsAction}
            deleteAction={deleteAction}
        >
            <View style={userCardStyles.cardView}>
                {
                    active ?
                    <Image 
                        source={{ uri: `${API_BASE_URL}/${picture}` }} 
                        style={userCardStyles.cardImage}
                        resizeMode="cover"
                    /> :
                    <Grayscale>
                        <Image 
                            source={{ uri: `${API_BASE_URL}/${picture}` }} 
                            style={userCardStyles.cardImage}
                            resizeMode="cover"
                        />
                    </Grayscale>
                } 
                <View>
                    <Text style={[{ fontWeight: 'bold' }, !active ? userCardStyles.inactive : '']}>{name}</Text>
                    <Text style={!active ? userCardStyles.inactive : ''}>{documentNumber}</Text>
                    <Text style={!active ? userCardStyles.inactive : ''}>Admin: {isAdmin ? "true" : "false"}</Text>
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
    },
    inactive: {
        color: '#abb2bf'
    }
})