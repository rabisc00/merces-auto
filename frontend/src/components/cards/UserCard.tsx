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

type Props = User & {
    onDelete?: () => void;
}

export function UserCard({ 
    id, 
    documentNumber, 
    name, 
    picture, 
    isAdmin, 
    active,  
    onDelete
}: Props) {
    const navigation = useNavigation<UsersOptionsNavigationProp>();
    const { showLoading, hideLoading } = useLoading();
    const { userToken, isUserAdmin, logout, userId } = useAuth();

    const deleteAction = () => {
        confirm(async () => {
            try {
                showLoading();

                await deleteUser(id, userToken);
                onDelete?.();

                if (userId === id) logout();
            } finally {
                hideLoading();
            }
            
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
                    <Image 
                        source={{ uri: `${API_BASE_URL}/${picture}` }} 
                        style={userCardStyles.cardImage}
                        resizeMode="cover"
                    /> 
                    
                    <View>
                        <Text style={[globalStyles.cardText, globalStyles.boldText, !active ? userCardStyles.inactive : '']}>{name} {isAdmin && '(Admin)'}</Text>
                        <Text style={[globalStyles.cardText, !active ? userCardStyles.inactive : '']}>{documentNumber}</Text>
                    </View>
                </View>
                
                <CardActionButtons 
                    deleteAction={isUserAdmin? deleteAction : undefined}
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