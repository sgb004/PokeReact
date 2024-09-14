import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
import {
    getPokemonIndexedDB,
    patchPokemonIndexedDB,
    sendListPokemonIndexedDB,
} from "../indexedDB/driver";
import { Pokemon, SendingListFetchRequest } from "../types";

const appUseIndexedDB = window[
    "appUseIndexedDB" as keyof typeof window
] as boolean;

const fetchScreenGrid = (input: RequestInfo | URL, init?: RequestInit) =>
    new Promise<ScreenGridFetchRequest>((resolve, reject) =>
        fetch(input, init)
            .then((request) => request.json())
            .then(resolve)
            .catch(reject)
    );

let fetchToMyPokemonScreenGrid = fetchScreenGrid;

let fetchToSendingListPokemon = (
    url: RequestInfo | URL,
    method: "POST" | "DELETE",
    pokemonSelected: number[],
    errorMessage: string
) =>
    new Promise<SendingListFetchRequest>((resolve, reject) =>
        fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pokemon: pokemonSelected,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(errorMessage);
                }
            })
            .then(resolve)
            .catch(reject)
    );

let fetchToSetFavorite = (id: number, favorite: 1 | 0, errorMessage: string) =>
    new Promise((resolve, reject) =>
        fetch(`/api/pokemon/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                favorite,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(errorMessage);
                }
            })
            .then(resolve)
            .catch(reject)
    );

let fetchToPatchPokemon = (id: number, pokemon: Pokemon) =>
    new Promise((resolve, reject) =>
        fetch(`/api/pokemon/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: pokemon.name,
                cp: pokemon.cp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                hp: pokemon.hp,
                favorite: pokemon.favorite,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(
                        `Error to update the Pokémon ${pokemon.name}, status: ${response.status}`
                    );
                }
            })
            .then(resolve)
            .catch(reject)
    );

if (appUseIndexedDB) {
    /* TODO: Implement fetch to IndexedDB */

    fetchToMyPokemonScreenGrid = (input: RequestInfo | URL) =>
        new Promise<ScreenGridFetchRequest>((resolve, reject) =>
            getPokemonIndexedDB(input)
                .then((data) => resolve(data))
                .catch(reject)
        );

    fetchToSendingListPokemon = (
        _,
        method: "POST" | "DELETE",
        pokemonSelected: number[],
        errorMessage: string
    ) =>
        new Promise<SendingListFetchRequest>((resolve, reject) => {
            sendListPokemonIndexedDB(method, pokemonSelected)
                .then(resolve)
                .catch((error) => {
                    console.error(error);
                    reject(errorMessage);
                });
        });

    fetchToSetFavorite = (id: number, favorite: 1 | 0, errorMessage: string) =>
        new Promise((resolve, reject) => {
            patchPokemonIndexedDB(id, { favorite })
                .then(resolve)
                .catch((error) => {
                    console.error(error);
                    reject(errorMessage);
                });
        });
}

export const fetchPokedexScreenGrid = fetchScreenGrid;

export const fetchMyPokemonScreenGrid = fetchToMyPokemonScreenGrid;

export const fetchSendingListPokemon = fetchToSendingListPokemon;

export const fetchSetFavorite = fetchToSetFavorite;

export const fetchPatchPokemon = fetchToPatchPokemon;
