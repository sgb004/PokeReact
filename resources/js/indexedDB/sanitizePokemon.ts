import { PokemonDataIndexedDB } from "../types";

const sanitizePokemon = (pokemon: PokemonDataIndexedDB) => {
    return {
        number: pokemon.api_id,
        name: pokemon.name,
        cp: pokemon.cp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        hp: pokemon.hp,
        favorite: pokemon.favorite,
        created_at: new Date(pokemon.created_at).getTime(),
        updated_at: new Date(pokemon.updated_at).getTime(),
    };
};

export default sanitizePokemon;
