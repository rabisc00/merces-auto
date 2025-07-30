import { Text } from "react-native";
import { globalStyles } from "../styles/global";
import { View } from "react-native";
import React from "react";
import dayjs from 'dayjs';

type Props = {
    createdAt?: string;
    updatedAt?: string;
}

const Timestamps: React.FC<Props> = ({
    createdAt,
    updatedAt
}) => {
    return (
        <View style={globalStyles.timestampView}>
            <Text style={globalStyles.timestampText}>Created At: {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</Text>
            <Text style={globalStyles.timestampText}>Updated At: {dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
    )
};

export default Timestamps;