import { useEffect, useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import { DimensionValue } from "react-native";
import { globalStyles } from "../styles/global";
import { Text } from "react-native";
import dayjs from "dayjs";
import DateTimePicker from "react-native-modal-datetime-picker";

type Props = {
    label: string;
    value: string;
    onChangeValue: (value: string) => void;
    required?: boolean;
    errorMessage?: string | false;
    width?: DimensionValue;
}

export const DatePicker: React.FC<Props> = ({
    label,
    value,
    onChangeValue,
    required,
    errorMessage,
    width
}) => {
    const [pickerVisible, setPickerVisible] = useState<boolean>(false);
    const [dateString, setDateString] = useState<string>('');

    useEffect(() => {
        const initialDate = new Date(value);
        if (!isNaN(initialDate.getDate())) {
            setDateString(dayjs(initialDate).format('YYYY-MM-DD'));
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
                style={[globalStyles.datetimeContainer, errorMessage && globalStyles.inputError]}
            >
                <Text>{dateString || 'Select a date'}</Text>
            </TouchableOpacity>
            {errorMessage && <Text style={globalStyles.errorText}>{errorMessage}</Text>}

            <DateTimePicker
                isVisible={pickerVisible}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onConfirm={(date) => {
                    onChangeValue(dayjs(date.toString()).format('YYYY-MM-DD'));
                    setPickerVisible(false);
                }}
                onCancel={() => setPickerVisible(false)}
            />
        </View>
    )
}