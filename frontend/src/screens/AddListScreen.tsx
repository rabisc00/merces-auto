import { useNavigation } from "@react-navigation/native";
import { AddListNavigationProp, AddListStackParamList, NavigationProp, RootStackParamList } from "../types/navigation";
import { useState } from "react";
import AddButtonList from "../components/AddButtonList/AddButtonList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSafeArea } from "../hooks/useSafeArea";
import { View } from "react-native";


export default function AddListScreen() {
    const navigation = useNavigation<AddListNavigationProp>();
    const [focusedId, setFocusedId] = useState('');

    const insets = useSafeArea();

    const buttons = [
        {
            id: '1',
            title: 'Register New User',
            iconName: 'person-add',
            onPress: () => {
                setFocusedId('1');
                navigation.navigate('UserRegistration');
            }
        }
    ];

    return (
        <View style={insets}>
            <AddButtonList buttons={buttons} />
        </View>
    )
};