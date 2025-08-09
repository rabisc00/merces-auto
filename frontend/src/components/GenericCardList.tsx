import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/global';
import { ListResponse } from '../types/api';
import { useAuth } from '../context/AuthContext';

type GenericCardListProps<T> = {
    fetchData: (page: number) => Promise<ListResponse<T>>;
    renderItem: (item: T) => React.ReactElement;
    keyExtractor: (item: T) => string;
    navigateAdd?: () => void;
    refreshFlag: boolean;
    addButtonText: string;
    showAdd?: boolean;
};

export function GenericCardList<T>({ 
    fetchData,
    renderItem,
    keyExtractor,
    navigateAdd,
    addButtonText,
    refreshFlag,
    showAdd
}: GenericCardListProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState<number | null>(null);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const res = await fetchData(page);

            setItems((prev) => [...prev, ...res.records]);
            setPage(res.currentPage + 1);
            setTotalPages(res.totalPages);
            setHasMore(res.currentPage < res.totalPages);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const refreshItems = async () => {
            setLoading(true);
            try {
                const res = await fetchData(1);
                setItems(res.records);
                setPage(2);
                setTotalPages(res.totalPages);
                setHasMore(res.currentPage < res.totalPages);
            } finally {
                setLoading(false);
            }   
        };

        refreshItems();
    }, [refreshFlag]);

    return (
        <View>
            {showAdd && 
                <View style={cardListStyles.buttonsRow}>
                    {navigateAdd &&
                        <TouchableOpacity
                            style={globalStyles.buttonWithIcon}
                            onPress={navigateAdd}
                        >
                            <Ionicons
                                name="add-circle-outline"
                                size={24}
                                style={globalStyles.buttonIcon}
                            />
                            <Text style={globalStyles.buttonWithIconText}>
                                {addButtonText}
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            }
            
            <FlatList
                data={items}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={keyExtractor}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator /> : null}
                ListEmptyComponent={ !loading ? (
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Text>No items found.</Text>
                    </View>
                ) : null}
            /> 
        </View>
    )
}

const cardListStyles = StyleSheet.create({
    buttonsRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        justifyContent: 'space-evenly'
    }
})