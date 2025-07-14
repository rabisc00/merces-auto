import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./AddButtonList.styles";
import AddButtonListProps from "./AddButtonList.types";

const AddButtonList: React.FC<AddButtonListProps> = ({ buttons }) => {
    return (
        <View style={styles.container}>
            {buttons.map((button) => {
                return (
                    <TouchableOpacity
                        key={button.id}
                        style={styles.button}
                        onPress={button.onPress}
                    >
                        <Ionicons
                            name={button.iconName}
                            size={24}
                            style={styles.icon}
                        />
                        <Text style={styles.text}>
                            {button.title}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

export default AddButtonList;