import { Pokemon } from "../types";
import IndexedDBConnection from "./IndexedDBConnection";

class PokemonIndexedDB extends IndexedDBConnection {
    _DB_NAME = "pokedex";
    _DB_VERSION = 1;
    _DB_STORE_NAME = "pokemon";

    init() {
        const onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const store = (
                event.currentTarget as IDBOpenDBRequest
            ).result.createObjectStore(this._DB_STORE_NAME, {
                keyPath: "id",
                autoIncrement: true,
            });

            store.createIndex("name", "name", { unique: false });
            store.createIndex("nameNormalized", "nameNormalized", {
                unique: false,
            });
            store.createIndex("number", "number", { unique: false });
            store.createIndex("cp", "cp", { unique: false });
            store.createIndex("attack", "attack", { unique: false });
            store.createIndex("defense", "defense", { unique: false });
            store.createIndex("hp", "hp", { unique: false });
            store.createIndex("favorite", "favorite", { unique: false });
        };

        return super.init(onupgradeneeded);
    }

    getAll(orderBy: string, direction: "next" | "prev", search: string) {
        return super.getAll(orderBy, "id", direction, search, "nameNormalized");
    }

    add(pokemon: Pokemon) {
        return super.add({
            ...pokemon,
            nameNormalized: this.strNormalize(pokemon.name),
        });
    }
}

export default PokemonIndexedDB;
