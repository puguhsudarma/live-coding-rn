import axios from 'axios';
import { PokemonWithId } from '../types/pokemon';
import { GetPokedexResponse } from '../types/responseApi';
import { findIdInUrl, handleError } from '../utils/utils';

export const getPokemon = async (
    url: string,
): Promise<{
    data: PokemonWithId[];
    nextLink: string | null;
}> => {
    try {
        const response = await axios.get<GetPokedexResponse>(url);
        const { data } = response;

        const transformedResult = data.results.map((item) => ({
            ...item,
            id: findIdInUrl(item.url),
        }));

        return {
            data: transformedResult,
            nextLink: data.next,
        };
    } catch (error) {
        handleError(error);
        throw error;
    }
};
