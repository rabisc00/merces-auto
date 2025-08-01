import RNPickerSelect from "react-native-picker-select";
import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from "../styles/global";
import { DropdownItem } from "../types/dropdown";

type Props = {
    label: string;
    required: boolean;
    selectedValue: string;
    options: DropdownItem[];
    onValueChange: (value: string) => void;
    errorMessage?: string | boolean;
    width?: DimensionValue;
};

export const DropdownList: React.FC<Props> = ({
    label,
    required,
    selectedValue,
    options,
    onValueChange,
    errorMessage,
    width
}) => {
    return (
        <View style={[globalStyles.inputContainer, { width }]}>
            <Text style={globalStyles.inputLabel}>
                {label}
                {required && <Text style={globalStyles.asterisk}> *</Text>}
            </Text>
            <Dropdown
                style={[styles.dropdown, errorMessage && globalStyles.inputError]}
                selectedTextStyle={{
                    fontSize: 14,
                    color: 'black',
                    flex: 1
                }}
                data={options}
                labelField="label"
                valueField="value"
                placeholder="Select a bus route..."
                value={selectedValue}
                onChange={(item) => onValueChange(item)}
                renderItem={(item) => (
                    <View style={{ padding: 10 }}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 14 }}>
                            {item.label}
                        </Text>
                    </View>
                )}
            />
            {errorMessage && <Text style={globalStyles.errorText}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
    },
    selectedText: {
        fontSize: 14,
        color: 'black',
        overflow: 'hidden',
    },
    itemContainer: {
        padding: 10,
    },
    itemText: {
        fontSize: 14,
        color: 'black',
    },
})