import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/global';

type ButtonItem = {
    id: string;
    title: string;
    iconName: string;
    onPress: () => void;
};

type AddButtonListProps = {
    buttons: ButtonItem[];
};

const AddButtonList: React.FC<AddButtonListProps> = ({ buttons }) => {
    return (
        <View style={buttonListStyles.container}>
            {buttons.map((button) => {
                return (
                    <TouchableOpacity
                        key={button.id}
                        style={globalStyles.buttonWithIcon}
                        onPress={button.onPress}
                    >
                        <Ionicons
                            name={button.iconName}
                            size={24}
                            style={globalStyles.buttonIcon}
                        />
                        <Text style={globalStyles.buttonWithIconText}>
                            {button.title}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

const buttonListStyles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-start'
  }
});

export default AddButtonList;