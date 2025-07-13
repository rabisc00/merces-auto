import { useNavigation } from "@react-navigation/native";
import { AddListNavigationProp, AddListStackParamList, NavigationProp, RootStackParamList } from "../types/navigation";
import { useState } from "react";
import AddButtonList from "../components/AddButtonList/AddButtonList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export default function AddListScreen() {
    const navigation = useNavigation<AddListNavigationProp>();
    const [focusedId, setFocusedId] = useState('');

    const buttons = [
        {
            id: '1',
            title: 'Register New User',
            iconName: {
                active: 'person-add',
                inactive: 'person-add-outline'
            },
            onPress: () => {
                setFocusedId('1');
                navigation.navigate('UserRegistration');
            },
            color: '#ffb703',
            activeColor: '#fb8500'
        }
    ];

    return (
        <AddButtonList buttons={buttons} focusedId={focusedId} />
    )
};