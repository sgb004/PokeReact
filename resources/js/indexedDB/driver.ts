import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
import { Pokemon } from "../types";
import PokemonIndexedDB from "./PokemonIndexedDB";

let pokemonIndexedDB: PokemonIndexedDB;

const initSuccessPokemonIndexedDB = () =>
    new Promise((resolve) => resolve(null));
const initErrorPokemonIndexedDB = () =>
    new Promise((_, reject) =>
        reject("There was an error to connect with the database.")
    );

let initPokemonIndexedDB = () =>
    new Promise((resolve, reject) => {
        pokemonIndexedDB = new PokemonIndexedDB();
        pokemonIndexedDB
            .init()
            .then(() => {
                initPokemonIndexedDB = initSuccessPokemonIndexedDB;
                resolve(null);
            })
            .catch(() => {
                initPokemonIndexedDB = initErrorPokemonIndexedDB;
                reject();
            });
    });

export const getPokemonIndexedDB = (input: RequestInfo | URL) => {
    const params = new URLSearchParams(input as string);
    const filter = params.get("filter") ?? "number";
    const sort = params.get("sort") === "asc" ? "next" : "prev";
    const search = params.get("search") ?? "";

    return new Promise<ScreenGridFetchRequest>((resolve, reject) => {
        initPokemonIndexedDB()
            .then(() => pokemonIndexedDB.getAll(filter, sort, search))
            .then((pokemon) =>
                resolve({
                    data: pokemon as Pokemon[],
                    next_page_url: "",
                })
            )
            .catch(reject);
    });
};
