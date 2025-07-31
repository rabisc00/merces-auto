import { StyleSheet, Text } from "react-native";
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
        <View style={styles.timestampView}>
            <Text style={globalStyles.smallText}>Created At: {dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</Text>
            <Text style={globalStyles.smallText}>Updated At: {dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    timestampView: {
        position: 'absolute',
        bottom: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    }
})

export default Timestamps;