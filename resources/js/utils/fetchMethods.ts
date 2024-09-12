import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
import { getPokemonIndexedDB } from "../indexedDB/driver";
import { Pokemon } from "../types";

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
    new Promise<{ pokemon: Pokemon[]; message: string }>((resolve, reject) =>
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

let fetchToSetFavorite = (
    input: RequestInfo | URL,
    init: RequestInit,
    errorMessage: string
) =>
    new Promise((resolve, reject) =>
        fetch(input, init)
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

let fetchToPatchPokemon = (
    input: RequestInfo | URL,
    init: RequestInit,
    name: string
) =>
    new Promise((resolve, reject) =>
        fetch(input, init)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(
                        `Error to update the Pokémon ${name}, status: ${response.status}`
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
}

export const fetchPokedexScreenGrid = fetchScreenGrid;

export const fetchMyPokemonScreenGrid = fetchToMyPokemonScreenGrid;

export const fetchSendingListPokemon = fetchToSendingListPokemon;

export const fetchSetFavorite = fetchToSetFavorite;

export const fetchPatchPokemon = fetchToPatchPokemon;
