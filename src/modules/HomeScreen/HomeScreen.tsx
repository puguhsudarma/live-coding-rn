import axios from 'axios';
import { upperFirst } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const URL = 'https://pokeapi.co/api/v2/pokemon';
const IMAGE = 'https://pokeres.bastionbot.org/images/pokemon/{pokemonID}.png';

const HomeScreen: React.FC = () => {
    const { loading, pokedex, loadMore, onLoadMore } = useHomeScreen();

    return (
        <View style={styles.container}>
            <FlatList
                data={pokedex}
                keyExtractor={(item) => `${item.id}`}
                ListHeaderComponent={() => {
                    return <View style={{ paddingTop: 60 }} />;
                }}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={() => {
                    if (loadMore) {
                        return (
                            <View
                                style={{
                                    paddingVertical: 20,
                                    alignItems: 'center',
                                }}
                            >
                                <ActivityIndicator color={'#000'} />
                                <Text>{'Loading...'}</Text>
                            </View>
                        );
                    }

                    return null;
                }}
                ListEmptyComponent={() => {
                    if (loading) {
                        return (
                            <View
                                style={{
                                    paddingTop: 100,
                                    alignItems: 'center',
                                }}
                            >
                                <ActivityIndicator color={'#000'} />
                                <Text>{'Loading...'}</Text>
                            </View>
                        );
                    }

                    return null;
                }}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 22,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                }}
                            >
                                {upperFirst(item.name)}
                            </Text>
                            <Image
                                source={{ uri: printUrl(IMAGE, `${item.id}`) }}
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};

interface Pokemon {
    name: string;
    url: string;
}

interface PokemonWithId extends Pokemon {
    id: number;
}

interface GetPokedexResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Pokemon>;
}

const findIdInUrl = (url: string): number => {
    const split = url.split('/');
    const id = split[split.length - 2];

    return Number(id);
};

export const printUrl = (url: string, data: string[] | string) => {
    if (typeof data === 'string') {
        return url.replace(/{\w*}/gi, data);
    }

    let iterator = 0;
    return url.replace(/{\w*}/gi, () => data[iterator++]);
};

const useHomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [pokedex, setPokedex] = useState<PokemonWithId[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const [nextLink, setNextLink] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<GetPokedexResponse>(URL)
            .then((response) => {
                const { data } = response;

                const tranformedResult = data.results.map((item) => ({
                    ...item,
                    id: findIdInUrl(item.url),
                }));
                setNextLink(data.next);
                setPokedex(tranformedResult);
                setLoading(false);
            })
            .catch((error) => {
                Alert.alert('Error', error.message);
                setLoading(false);
            });
    }, []);

    const onLoadMore = useCallback(async () => {
        if (loadMore || !nextLink) {
            return false;
        }

        try {
            setLoadMore(true);
            const response = await axios.get<GetPokedexResponse>(nextLink);

            const { data } = response;

            const tranformedResult = data.results.map((item) => ({
                ...item,
                id: findIdInUrl(item.url),
            }));
            setNextLink(data.next);
            setPokedex([...pokedex, ...tranformedResult]);
            setLoadMore(false);
        } catch (error) {
            Alert.alert('Error', error.message);
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
});

export default HomeScreen;
