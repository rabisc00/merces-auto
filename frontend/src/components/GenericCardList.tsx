import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../styles/global';

type GenericCardListProps<T> = {
    fetchData: (page: number) => Promise<T[]>;
    renderItem: (item: T) => React.ReactElement;
    keyExtractor: (item: T) => string;
    navigateAdd: () => void;
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
    pageSize = 10
}: GenericCardListProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newItems = await fetchData(page);

        setItems((prev) => [...prev, ...newItems]);
        setPage((prev) => prev + 1);
        setHasMore(newItems.length >= pageSize);
        setLoading(false);
    };

    useEffect(() => {
        loadMore();
    }, []);

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