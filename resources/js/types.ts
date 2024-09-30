import { CSSProperties } from "react";

export type ScreenActions = {
    name: string;
    content: string | JSX.Element;
    action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type ScreenFilters = {
    name: string;
    value: string;
};

export type Sort = "asc" | "desc";

export type ScreenHeaderParams = {
    filter: string;
    sort: Sort;
    search: string;
};

export type Pokemon = {
    id: number;
    name: string;
    number: number;
    cp: number;
    attack: number;
    defense: number;
    hp: number;
    favorite: boolean;
    enabled: boolean;
};

export type PokemonAttrs = keyof Pokemon;

export type SetPokemon = React.Dispatch<React.SetStateAction<Pokemon>>;

export type PatchPokemon = (
    key: PokemonAttrs,
    value: string | number | boolean
) => void;

export interface PokemonStatCSS extends CSSProperties {
    "--value": number;
}

export type StatProps = {
    name: string;
    value: number;
    icon: "icon-sword" | "icon-shield" | "icon-heart";
};

export type SendingListFetchRequest = {
    pokemon: Pokemon[];
    message: string;
};

export type PokemonDataIndexedDB = Pokemon & {
    api_id: number;
    created_at: Date;
    updated_at: Date;
};

export type ResponseErrorsObject = { [key: string]: string };

export type ResponseValidation = {
    success: boolean;
    pokemon: PokemonDataIndexedDB[];
    errors: string[];
};

export type ResponseUploadPokemon = {
    success: boolean;
    message: string;
};

export type ResponseUploadAfterValidation = {
    success: boolean;
    message: string;
    errors: string[];
};

export type ResponseUploadDataPokemon = {
    status: number;
    message: string;
    errors: string[] | ResponseErrorsObject;
};
