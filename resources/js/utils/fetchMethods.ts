import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
import {
    getPokemonIndexedDB,
    patchPokemonIndexedDB,
    sendListPokemonIndexedDB,
} from "../indexedDB/driver";
import { Pokemon, SendingListFetchRequest } from "../types";
import appUseIndexedDB from "./appUseIndexedDB";

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

let fetchToUploadDataPokemon = (
    data: string,
    deleteCurrentPokemon: boolean
) => {
    const errorMessage = "Error to upload the Pokémon";

    return new Promise((resolve, reject) =>
        fetch("my-pokedex/get-token")
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(errorMessage);
                }
            })
            .then((token) =>
                fetch("/my-pokedex/upload", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-Token": token.token,
                    },
                    body: JSON.stringify({
                        pokemon: data,
                        deleteCurrentPokemon,
                    }),
                })
            )
            .then((response) => {
                if (response.status === 200 || response.status === 400) {
                    return response.json();
                } else {
                    throw new Error(errorMessage);
                }
            })
            .then((response) => {
                const hasError = response.status === 400;

                if (!hasError) {
                    resolve(response.message);
                } else if (typeof response.errors === "object") {
                    const errors = response.errors;
                    const errorsKeys = Object.keys(errors)[0];

                    if (errorsKeys) {
                        throw new Error(errors[errorsKeys].toString());
                    }
                }

                if (hasError) throw new Error(response.message ?? errorMessage);
            })
            .catch(reject)
    );
};

if (appUseIndexedDB) {
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

    fetchToPatchPokemon = (id: number, pokemon: Pokemon) => {
        return new Promise((resolve, reject) => {
            patchPokemonIndexedDB(id, {
                name: pokemon.name,
                cp: pokemon.cp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                hp: pokemon.hp,
            })
                .then(resolve)
                .catch((error) => {
                    console.error(error);
                    reject(`Error to update the Pokémon ${pokemon.name}`);
                });
        });
    };
}

export const fetchPokedexScreenGrid = fetchScreenGrid;

export const fetchMyPokemonScreenGrid = fetchToMyPokemonScreenGrid;

export const fetchSendingListPokemon = fetchToSendingListPokemon;

export const fetchSetFavorite = fetchToSetFavorite;

export const fetchPatchPokemon = fetchToPatchPokemon;

export const fetchUploadDataPokemon = fetchToUploadDataPokemon;
