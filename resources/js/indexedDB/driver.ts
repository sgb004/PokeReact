import { ScreenGridFetchRequest } from "../components/Screens/ScreenGrid";
import { Pokemon, SendingListFetchRequest } from "../types";
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
                    message: "Pokemon added successfully.",
                })
            )
            .catch(reject);
    });

export const getPokemonIndexedDB = (input: RequestInfo | URL) => {
    const params = new URLSearchParams(input as string);
    const orderBy = params.get("filter") ?? "number";
    const direction = params.get("sort") === "asc" ? "next" : "prev";
    const search = params.get("search") ?? "";

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
                    next_page_url: "",
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
    } else {
        return new Promise<SendingListFetchRequest>((resolve) =>
            resolve({} as SendingListFetchRequest)
        );
    }
};
