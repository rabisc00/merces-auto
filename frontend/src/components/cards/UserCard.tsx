import BaseCard from "../BaseCard";
import { useNavigation } from "@react-navigation/native";
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
import { globalStyles } from "../../styles/global";

export function UserCard({ id, documentNumber, name, picture, isAdmin, active }: User) {
    const navigation = useNavigation<UsersOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken } = useAuth();

    const deleteAction = () => {
        confirm(async () => {
            showLoading();
            await deleteUser(id, userToken);
            hideLoading();

            navigation.navigate('UsersList');
        })
    };

    const detailsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }
        
        navigation.navigate('UserDetails', { userId: id });
    };

    const tripsAction = () => {
        if (!id) {
            Alert.alert(ALERT_MESSAGES.INVALID_ID.title, ALERT_MESSAGES.INVALID_ID.message);
            return;
        }

        navigation.navigate('UserTripsList', { id });
    };
    
    return (
        <BaseCard >
            <View style={globalStyles.cardView}>
                <View style={userCardStyles.cardContent}>
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
                        <Text numberOfLines={3} style={[globalStyles.cardText, globalStyles.boldText, !active ? userCardStyles.inactive : '']}>{name}</Text>
                        <Text style={[globalStyles.cardText, !active ? userCardStyles.inactive : '']}>{documentNumber}</Text>
                        <Text style={[globalStyles.cardText, !active ? userCardStyles.inactive : '']}>Admin: {isAdmin ? "true" : "false"}</Text>
                    </View>
                </View>
                
                <CardActionButtons 
                    deleteAction={deleteAction}
                    detailsAction={detailsAction}
                    tripsAction={tripsAction}
                />
            </View>
        </BaseCard>
    );
}

const userCardStyles = StyleSheet.create({
    cardImage: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: '#ccc',
    },
    inactive: {
        color: '#abb2bf'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        gap: 16,
    },
})