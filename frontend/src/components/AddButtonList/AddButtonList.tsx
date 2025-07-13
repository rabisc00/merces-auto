import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./AddButtonList.styles";
import AddButtonListProps from "./AddButtonList.types";

const AddButtonList: React.FC<AddButtonListProps> = ({ buttons, focusedId }) => {
    return (
        <View style={styles.container}>
            {buttons.map((button) => {
                const isFocused = focusedId === button.id;

                return (
                    <TouchableOpacity
                        key={button.id}
                        style={[
                            styles.button,
                            isFocused && styles.focusedButton
                        ]}
                        onPress={button.onPress}
                    >
                        <Ionicons
                            name={isFocused ? button.iconName.active : button.iconName.inactive}
                            size={24}
                            color={isFocused ? button.activeColor : button.color}
                            style={styles.icon}
                        />
                        <Text style={[
                            styles.text,
                            isFocused && styles.focusedText
                        ]}>
                            {button.title}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

export default AddButtonList;