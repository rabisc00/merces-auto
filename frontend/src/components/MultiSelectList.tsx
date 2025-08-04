import { DimensionValue, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListObject } from "../types/listObject";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
    label: string;
    selectedItems: string[];
    options: ListObject[];
    onValueChange: (value: string) => void;
    required?: boolean;
    errorMessage?: string | boolean;
    width?: DimensionValue
};

export const MultiSelectList: React.FC<Props> = ({
    label,
    required,
    selectedItems,
    options,
    onValueChange,
    errorMessage,
    width
}) => {
    const [expanded, setExpanded] = useState(false);

    const selectedLabels = options
        .filter(option => selectedItems.includes(option.value))
        .map(option => option.label)
        .join(", ");

    return (
        <View style={[globalStyles.inputContainer, { width, position: 'relative' }]}>
            <Text style={globalStyles.inputLabel}>
                {label}
                {required && <Text style={globalStyles.asterisk}>*</Text>}
            </Text>
            <TouchableOpacity
                style={[globalStyles.dropdown, errorMessage && globalStyles.inputError]}
                onPress={() => setExpanded(prev => !prev)}
            >
                <Text>
                    {selectedLabels || 'Select...'}
                </Text>
            </TouchableOpacity>
            {errorMessage && <Text style={globalStyles.errorText}>{errorMessage}</Text>}
            {expanded && (
                <View style={listStyles.dropdownList}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => {
                            const isSelected = selectedItems.includes(item.value);
                            return (
                                <TouchableOpacity
                                    style={[listStyles.listItem, isSelected && listStyles.selectedText]}
                                    onPress={() => onValueChange(item.value)}
                                >
                                    <Text style={isSelected ? listStyles.selectedText : listStyles.text}>
                                        {item.label}
                                    </Text>

                                    {selectedItems.includes(item.value) && <Ionicons
                                        name="checkmark-outline"
                                        size={24}
                                        style={globalStyles.buttonIcon}
                                    />}
                                </TouchableOpacity>
                            )
                        }}  
                    />
                </View>
            )}
        </View>
    )
}

const listStyles = StyleSheet.create({
    listItem: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectedText: {
        fontSize: 14,
        color: 'black',
        overflow: 'hidden',
    },
    dropdownList: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        zIndex: 9999,
        maxHeight: 200
    },
    text: {
        color: '#333',
    }
})