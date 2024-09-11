import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
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
    input: RequestInfo | URL,
    init?: RequestInit,
    messageError?: string
) =>
    new Promise<{ pokemon: Pokemon[]; message: string }>((resolve, reject) =>
        fetch(input, init)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(messageError);
                }
            })
            .then(resolve)
            .catch(reject)
    );

if (appUseIndexedDB) {
    /* TODO: Implement fetch to IndexedDB */
}

export const fetchPokedexScreenGrid = fetchScreenGrid;

export const fetchMyPokemonScreenGrid = fetchToMyPokemonScreenGrid;

export const fetchSendingListPokemon = fetchToSendingListPokemon;