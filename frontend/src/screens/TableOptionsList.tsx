import { useNavigation } from "@react-navigation/native";
import { TableOptionsNavigationProp, TableOptionsStackParamList, NavigationProp, RootStackParamList } from "../types/navigation";
import { useState } from "react";
import AddButtonList from "../components/AddButtonList";
import { useSafeArea } from "../hooks/useSafeArea";
import { View } from "react-native";


export default function TableOptionsScreen() {
    const navigation = useNavigation<TableOptionsNavigationProp>();

    const insets = useSafeArea();

    const buttons = [
        {
            id: '1',
            title: 'Drivers',
            iconName: 'person',
            onPress: () => {
                navigation.navigate('DriversList');
            }
        },
        {
            id: '2',
            title: 'Buses',
            iconName: 'bus',
            onPress: () => {
                navigation.navigate('BusRegistration');
            }
        },
        {
            id: '3',
            title: 'Bus Routes',
            iconName: 'trail-sign',
            onPress: () => {
                navigation.navigate('BusRouteRegistration');
            }
        },
        {
            id: '4',
            title: 'Timetables',
            iconName: 'alarm',
            onPress: () => {
                navigation.navigate('TimetableRegistration');
            }
        }
    ];

    return (
        <View style={{ paddingTop: insets.paddingTop, paddingBottom: insets.paddingBottom }}>
            <AddButtonList buttons={buttons} />
        </View>
    )
};