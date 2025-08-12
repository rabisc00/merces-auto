import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from "../styles/global";

type CardActionButtonsProps = {
    deleteAction?: () => void;
    detailsAction?: () => void;
    tripsAction?: () => void;
    timetablesAction?: () => void;
    workingHoursAction?: () => void;
};

export default function CardActionButtons({ deleteAction, detailsAction, tripsAction, timetablesAction, workingHoursAction } : CardActionButtonsProps) {
    return (
        <View style={styles.iconButtons}>
            {deleteAction && 
                <TouchableOpacity onPress={() => deleteAction()}>
                    <Ionicons
                        name="trash"
                        size={24}
                        style={[globalStyles.buttonDeleteIcon, globalStyles.buttonIcon]}
                    />
                </TouchableOpacity>
            }

            {detailsAction &&
                <TouchableOpacity onPress={() => detailsAction()}>
                    <Ionicons
                        name="create"
                        size={24}
                        style={globalStyles.buttonIcon}
                    />
                </TouchableOpacity>
            }
            
            {tripsAction &&
                <TouchableOpacity onPress={tripsAction}>
                    <Ionicons
                        name="airplane"
                        size={24}
                        style={globalStyles.buttonIcon}
                    />
                </TouchableOpacity>
            }

            {timetablesAction &&
                <TouchableOpacity onPress={timetablesAction}>
                    <Ionicons
                        name="calendar"
                        size={24}
                        style={globalStyles.buttonIcon}
                    />
                </TouchableOpacity>
            }

            {workingHoursAction &&
                <TouchableOpacity onPress={workingHoursAction}>
                    <Ionicons
                        name="alarm"
                        size={24}
                        style={globalStyles.buttonIcon}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
  iconButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: 8
  }
});