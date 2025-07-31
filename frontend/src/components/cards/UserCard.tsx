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
        <BaseCard >
            <View style={globalStyles.cardView}>
                <View style={globalStyles.cardContent}>
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
                        <Text numberOfLines={3} style={[globalStyles.boldText, !active ? userCardStyles.inactive : '']}>{name}</Text>
                        <Text style={!active ? userCardStyles.inactive : ''}>{documentNumber}</Text>
                        <Text style={!active ? userCardStyles.inactive : ''}>Admin: {isAdmin ? "true" : "false"}</Text>
                    </View>
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