import { upperFirst } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { GET_POKEMON_API, IMAGE } from '../constants/api';
import { getPokemon } from '../services/pokemonServices';
import { PokemonWithId } from '../types/pokemon';
import { parseUrl } from '../utils/utils';

const PokemonList: React.FC = () => {
    const { loading, pokedex, loadMore, onLoadMore } = useHomeScreen();

    const renderListHeaderComponent = useCallback(() => {
        return <View style={{ paddingTop: 60 }} />;
    }, []);

    const renderListFooterComponent = useCallback(() => {
        if (loadMore) {
            return (
                <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                    <ActivityIndicator color={'#000'} />
                    <Text>{'Loading...'}</Text>
                </View>
            );
        }

        return null;
    }, [loadMore]);

    const renderListEmptyComponent = useCallback(() => {
        if (loading) {
            return (
                <View style={{ paddingTop: 100, alignItems: 'center' }}>
                    <ActivityIndicator color={'#000'} />
                    <Text>{'Loading...'}</Text>
                </View>
            );
        }

        return null;
    }, [loading]);

    const renderItem: ListRenderItem<PokemonWithId> = useCallback(({ item }) => {
        return (
            <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
                <Image
                    source={{ uri: parseUrl(IMAGE, `${item.id}`) }}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                />
                <Text style={styles.textItem}>{upperFirst(item.name)}</Text>
            </View>
        );
    }, []);

    const renderItemSeparatorComponent = useCallback(() => {
        return <View style={{ height: 20 }} />;
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={pokedex}
                keyExtractor={(item) => `${item.id}`}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.4}
                ListHeaderComponent={renderListHeaderComponent}
                ListFooterComponent={renderListFooterComponent}
                ListEmptyComponent={renderListEmptyComponent}
                ItemSeparatorComponent={renderItemSeparatorComponent}
                renderItem={renderItem}
                numColumns={2}
            />
        </View>
    );
};

const useHomeScreen = () => {
    const [pokedex, setPokedex] = useState<PokemonWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(false);
    const [nextLink, setNextLink] = useState<string | null>(null);

    useEffect(() => {
        getPokemon(GET_POKEMON_API)
            .then((response) => {
                setNextLink(response.nextLink);
                setPokedex(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, []);

    const onLoadMore = useCallback(async () => {
        if (loadMore || !nextLink) {
            return false;
        }

        try {
            setLoadMore(true);
            const response = await getPokemon(nextLink);

            // store the data
            setNextLink(response.nextLink);
            setPokedex([...pokedex, ...response.data]);
            setLoadMore(false);
        } catch (error) {
            setLoadMore(false);
        }
    }, [nextLink, loadMore]);

    return {
        loading,
        pokedex,
        onLoadMore,
        loadMore,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    textItem: {
        fontWeight: 'bold',
        fontSize: 22,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});

export default PokemonList;
