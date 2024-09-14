import { Pokemon } from "../types";
import IndexedDBConnection from "./IndexedDBConnection";

type PokemonAdd = Omit<Pokemon, "id" | "enabled">;

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
            store.createIndex("created_at", "created_at", { unique: false });
            store.createIndex("updated_at", "updated_at", { unique: false });
        };

        return super.init(onupgradeneeded);
    }

    getAll({
        orderBy,
        direction,
        search,
        limit,
    }: {
        orderBy: string;
        direction: "next" | "prev";
        search?: string;
        limit?: number[];
    }) {
        return super.getAll({
            orderBy,
            keyPath: "id",
            direction,
            search: search ?? "",
            searchColumn: "nameNormalized",
            limit,
        });
    }

    get(id: IDBValidKey | IDBKeyRange) {
        return super.get(id) as Promise<Pokemon>;
    }

    add(pokemon: PokemonAdd) {
        return super.add({
            ...pokemon,
            nameNormalized: this.strNormalize(pokemon.name),
        });
    }

    update(pokemon: Pokemon) {
        return super.update({
            ...pokemon,
            nameNormalized: this.strNormalize(pokemon.name),
        });
    }
}

export default PokemonIndexedDB;
