import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from "../styles/global";

type CardActionButtonsProps = {
    deleteAction: () => void;
    detailsAction: () => void;
    tripsAction?: () => void;
    timetablesAction?: () => void;
};

export default function CardActionButtons({ deleteAction, detailsAction, tripsAction, timetablesAction } : CardActionButtonsProps) {
    return (
        <View style={styles.iconButtons}>
            <TouchableOpacity onPress={() => deleteAction()}>
                <Ionicons
                    name="trash"
                    size={24}
                    style={globalStyles.buttonDeleteIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => detailsAction()}>
                <Ionicons
                    name="create"
                    size={24}
                    style={globalStyles.buttonIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={tripsAction}>
                <Ionicons
                    name="bus"
                    size={24}
                    style={globalStyles.buttonIcon}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={timetablesAction}>
                <Ionicons
                    name="calendar"
                    size={24}
                    style={globalStyles.buttonIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  iconButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 16,
    width: '20%'
  }
});