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

let fetchList = {
    pokedexScreenGrid: fetchScreenGrid,
    myPokemonScreenGrid: fetchScreenGrid,
};

if (appUseIndexedDB) {
    fetchList["myPokemonScreenGrid"] = () =>
        new Promise((resolve) => {
            resolve({ data: [] });
        });
}

export const fetchPokedexScreenGrid = (
    input: RequestInfo | URL,
    init?: RequestInit
) => fetchList.pokedexScreenGrid(input, init);

export const fetchMyPokemonScreenGrid = (
    input: RequestInfo | URL,
    init?: RequestInit
) => fetchList.myPokemonScreenGrid(input, init);

export const fetchSendingListPokemon = fetchToSendingListPokemon;
