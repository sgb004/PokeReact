const appUseIndexedDB = window[
    "appUseIndexedDB" as keyof typeof window
] as boolean;

export default appUseIndexedDB;
