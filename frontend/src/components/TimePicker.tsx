import { DimensionValue, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {
    label: string;
    value: string;
    onChangeValue: (value: string) => void;
    required?: boolean;
    errorMessage?: string | false;
    width?: DimensionValue;
}

export const TimePicker: React.FC<Props> = ({
    label,
    value,
    onChangeValue,
    required,
    errorMessage,
    width
}) => {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [dateString, setDateString] = useState<string>('');

    useEffect(() => {
        const initialDate = new Date(value);
        if (!isNaN(initialDate.getTime())) {
            initialDate.setSeconds(0);
            setDateString(initialDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }));
        } else {
            setDateString(value);
        }
    }, [value])

    return (
        <View style={[globalStyles.inputContainer, { width }]}>
            <Text style={globalStyles.inputLabel}>
                {label}
                {required && <Text style={globalStyles.asterisk}>*</Text>}
            </Text>
            <TouchableOpacity
                onPress={() => setPickerVisible(true)}
                style={[styles.datetimeContainer, errorMessage && globalStyles.inputError]}
            >
                <Text>
                    {dateString || 'Select Time'}
                </Text>
            </TouchableOpacity>
            {errorMessage && <Text style={globalStyles.errorText}>{errorMessage}</Text>}

            <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="time"
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onConfirm={(date) => {
                    onChangeValue(date.toString());
                    setPickerVisible(false);
                }}
                onCancel={() => setPickerVisible(false)}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    datetimeContainer: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        borderRadius: 5
    }
});