/**
 * IndexedDBConnection
 * This class is used to connect to the IndexedDB
 * @author sgb004
 * @version 1.0
 */

class IndexedDBConnection {
    _DB_NAME = "";
    _DB_VERSION = 1;
    _DB_STORE_NAME = "";

    DB: IDBDatabase;

    constructor() {
        this.DB = null as unknown as IDBDatabase;
    }

    init(
        onupgradeneeded:
            | ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any)
            | null
    ) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this._DB_NAME, this._DB_VERSION);
            request.onupgradeneeded = onupgradeneeded;

            request.onsuccess = (event: Event) => {
                this.DB = (event.target as IDBOpenDBRequest).result;
                resolve(this.DB);
            };
            request.onerror = reject;
        });
    }

    /*
     * The code of this method works similar to startsWith
     */
    _rangeToSearch(
        store: IDBObjectStore,
        search: string,
        searchColumn: string
    ): [IDBObjectStore | IDBIndex, IDBValidKey | IDBKeyRange | null] {
        const searchNormalized = this.strNormalize(search);
        let index: IDBObjectStore | IDBIndex;
        let range: IDBValidKey | IDBKeyRange | null;

        index = store.index(searchColumn);
        range = IDBKeyRange.bound(
            searchNormalized,
            searchNormalized + "\uffff",
            true,
            false
        );

        return [index, range];
    }

    strNormalize = (str: string) => {
        let normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        normalized = normalized.toLowerCase();
        return normalized.replace(/[^a-z0-9]/g, "");
    };

    getObjectStore(storeName: string, mode: IDBTransactionMode) {
        return this.DB.transaction(storeName, mode).objectStore(storeName);
    }

    get(key: IDBValidKey | IDBKeyRange) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore(this._DB_STORE_NAME, "readonly");
            const request = store.get(key);

            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    getAll({
        orderBy,
        keyPath,
        direction,
        search,
        searchColumn,
        limit,
    }: {
        orderBy: string;
        keyPath: string;
        direction: "next" | "prev";
        search: string;
        searchColumn: string;
        limit?: number[];
    }) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore(this._DB_STORE_NAME, "readonly");
            const data: any = [];
            const limitStart =
                limit && limit[0] && limit[0] >= 0 ? limit[0] : 0;
            const limitEnd =
                limit && limit[1] && limit[1] > 0 ? limit[1] - 1 : 0;

            let index: IDBObjectStore | IDBIndex = store;
            let range: IDBValidKey | IDBKeyRange | null = null;
            let request;
            let count = 0;
            let countEnd = 0;

            if (search === "" && orderBy !== keyPath) {
                index = store.index(orderBy);
            } else if (search) {
                [index, range] = this._rangeToSearch(
                    store,
                    search,
                    searchColumn
                );
            }

            request = index.openCursor(range, direction);

            request.onsuccess = (event: Event) => {
                const cursor = (event.target as IDBRequest).result;

                if (cursor && (limitEnd === 0 || countEnd <= limitEnd)) {
                    if (count >= limitStart) {
                        data.push(cursor.value);
                        countEnd++;
                    }
                    count++;
                    cursor.continue();
                } else {
                    if (search != "") {
                        data.sort((a: any, b: any) => {
                            if (a[orderBy] < b[orderBy])
                                return direction === "next" ? -1 : 1;
                            if (a[orderBy] > b[orderBy])
                                return direction === "next" ? 1 : -1;
                            return 0;
                        });
                    }

                    resolve(data);
                }
            };
            request.onerror = reject;
        });
    }

    add(data: any) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore(this._DB_STORE_NAME, "readwrite");
            const request = store.add(data);

            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    update(data: any) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore(this._DB_STORE_NAME, "readwrite");
            const request = store.put(data);

            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }

    delete(key: IDBValidKey | IDBKeyRange) {
        return new Promise((resolve, reject) => {
            const store = this.getObjectStore(this._DB_STORE_NAME, "readwrite");
            const request = store.delete(key);

            request.onsuccess = resolve;
            request.onerror = reject;
        });
    }
}

export default IndexedDBConnection;
