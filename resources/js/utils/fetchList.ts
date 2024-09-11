import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";

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
