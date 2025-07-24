import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/global';
import { ListResponse } from '../types/api';

type GenericCardListProps<T> = {
    fetchData: (page: number) => Promise<ListResponse<T>>;
    renderItem: (item: T) => React.ReactElement;
    keyExtractor: (item: T) => string;
    navigateAdd: () => void;
    refreshKey: number;
    addIconName: string;
    addButtonText: string;
    pageSize?: number;
};

export function GenericCardList<T>({ 
    fetchData,
    renderItem,
    keyExtractor,
    navigateAdd,
    addIconName,
    addButtonText,
    refreshKey,
    pageSize = 10
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
    }, [refreshKey]);

    return (
        <View>
            <TouchableOpacity
                style={globalStyles.buttonWithIcon}
                onPress={navigateAdd}
            >
                <Ionicons
                    name={addIconName}
                    size={24}
                    style={globalStyles.buttonIcon}
                />
                <Text style={globalStyles.buttonWithIconText}>
                    {addButtonText}
                </Text>
            </TouchableOpacity>
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