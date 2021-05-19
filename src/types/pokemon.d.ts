export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonWithId extends Pokemon {
    id: number;
}
