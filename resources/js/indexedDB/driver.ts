import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
import {
    Pokemon,
    PokemonDataIndexedDB,
    ResponseUploadPokemon,
    SendingListFetchRequest,
} from "../types";
import PokemonIndexedDB from "./PokemonIndexedDB";
import sanitizePokemon from "./sanitizePokemon";

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

const addPokemonIndexedDB = (ids: number[]) =>
    new Promise((resolve, reject) => {
        const pokemon = ids.map((id) => {
            const nameElement = document.querySelector(
                `.pokedex-screen .pokemon:has(.pokemon-from-pokedex[value="${id}"]) .name`
            );
            const createdAt = new Date().getTime();

            return {
                number: id,
                name: nameElement?.textContent ?? "",
                cp: 0,
                attack: 0,
                defense: 0,
                hp: 0,
                favorite: false,
                created_at: createdAt,
                updated_at: createdAt,
            };
        });
        const list = pokemon.map((pokemon) => pokemonIndexedDB.add(pokemon));

        Promise.all(list)
            .then(() =>
                pokemonIndexedDB.getAll({
                    orderBy: "created_at",
                    direction: "prev",
                    limit: [0, 2],
                })
            )
            .then((pokemon) =>
                resolve({
                    pokemon,
                    message: "Pokemon added successfully",
                })
            )
            .catch(reject);
    });

const deletePokemonIndexedDB = (ids: number[]) =>
    new Promise((resolve, reject) => {
        const list = ids.map((id) => pokemonIndexedDB.delete(id));

        Promise.all(list)
            .then(() => resolve({ message: "Pokemon deleted successfully" }))
            .catch(reject);
    });

export const getPokemonIndexedDB = (input: RequestInfo | URL) => {
    const paramsStr = `${input}`.split("?")[1] ?? "";
    const params = new URLSearchParams(paramsStr);
    const direction = params.get("sort") === "asc" ? "next" : "prev";
    const search = params.get("search") ?? "";
    let orderBy = params.get("filter") ?? "number";

    if (orderBy === "recent") {
        orderBy = "created_at";
    }

    return new Promise<ScreenGridFetchRequest>((resolve, reject) => {
        initPokemonIndexedDB()
            .then(() =>
                pokemonIndexedDB.getAll({
                    orderBy,
                    direction,
                    search,
                })
            )
            .then((pokemon) =>
                resolve({
                    data: pokemon as Pokemon[],
                    next_page_url: null,
                })
            )
            .catch(reject);
    });
};

export const sendListPokemonIndexedDB = (
    method: "POST" | "DELETE",
    pokemonSelected: number[]
) => {
    if (method === "POST") {
        return new Promise<SendingListFetchRequest>((resolve, reject) => {
            initPokemonIndexedDB()
                .then(() => addPokemonIndexedDB(pokemonSelected))
                .then((data) => resolve(data as SendingListFetchRequest))
                .catch(reject);
        });
    } else if (method === "DELETE") {
        return new Promise<SendingListFetchRequest>((resolve, reject) => {
            initPokemonIndexedDB()
                .then(() => deletePokemonIndexedDB(pokemonSelected))
                .then((data) => resolve(data as SendingListFetchRequest))
                .catch(reject);
        });
    } else {
        return new Promise<SendingListFetchRequest>((resolve) =>
            resolve({} as SendingListFetchRequest)
        );
    }
};

export const patchPokemonIndexedDB = (id: Number, data: Object) =>
    new Promise((resolve, reject) => {
        const pokemonData = { id, ...data };

        initPokemonIndexedDB()
            .then(() => pokemonIndexedDB.get(id as IDBValidKey))
            .then((pokemon) =>
                pokemonIndexedDB.update({
                    ...pokemon,
                    ...pokemonData,
                } as Pokemon)
            )
            .then(resolve)
            .catch(reject);
    });

export const getAllPokemonIndexedDB = () =>
    new Promise<PokemonDataIndexedDB[]>((resolve, reject) => {
        initPokemonIndexedDB()
            .then(() =>
                pokemonIndexedDB.getAll({ orderBy: "id", direction: "next" })
            )
            .then((data) => resolve(data as PokemonDataIndexedDB[]))
            .catch(reject);
    });

export const uploadPokemonIndexedDB = (pokemon: PokemonDataIndexedDB[]) =>
    new Promise<ResponseUploadPokemon>((resolve, reject) =>
        initPokemonIndexedDB()
            .then(() => {
                const list = pokemon.map((pokemon) => {
                    pokemonIndexedDB.add(sanitizePokemon(pokemon));
                });
                return Promise.all(list);
            })
            .then(() =>
                resolve({
                    success: true,
                    message: "Pokemon added successfully",
                })
            )
            .catch(reject)
    );

export const deleteAllPokemonIndexedDB = () =>
    new Promise((resolve, reject) => {
        initPokemonIndexedDB()
            .then(() => pokemonIndexedDB.clear())
            .then(() => resolve(null))
            .catch(reject);
    });
