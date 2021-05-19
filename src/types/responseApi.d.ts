import { Pokemon } from './pokemon';

export interface GetPokedexResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Pokemon>;
}
