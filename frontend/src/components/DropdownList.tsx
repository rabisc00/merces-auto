import RNPickerSelect from "react-native-picker-select";
import { DimensionValue, StyleSheet, Text, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { globalStyles } from "../styles/global";
import { ListObject } from "../types/listObject";

type Props = {
    label: string;
    required: boolean;
    selectedValue: string;
    placeholder: string;
    options: ListObject[];
    onValueChange: (value: string) => void;
    errorMessage?: string | boolean;
    width?: DimensionValue;
    onEndReached?: () => void;
};

export const DropdownList: React.FC<Props> = ({
    label,
    required,
    placeholder,
    selectedValue,
    options,
    onValueChange,
    onEndReached,
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
                style={[globalStyles.dropdown, errorMessage && globalStyles.inputError]}
                selectedTextStyle={globalStyles.dropdownSelectedItemText}
                data={options}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={selectedValue}
                onChange={(item) => onValueChange(item.value)}
                renderItem={(item) => (
                    <View style={globalStyles.dropdownItemView}>
                        <Text style={globalStyles.dropdownItemText}>
                            {item.label}
                        </Text>
                    </View>
                )}
                flatListProps={{
                    onEndReached: () => {
                        onEndReached?.();
                    },
                    onEndReachedThreshold: 0.5
                }}
            />
            {errorMessage && <Text style={globalStyles.errorText}>{errorMessage}</Text>}
        </View>
    );
};