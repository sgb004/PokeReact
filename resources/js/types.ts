export type ScreenActions = {
    name: string;
    content: string | JSX.Element;
    action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type ScreenFilters = {
    name: string;
    value: string;
};

export type ScreenHeaderParams = {
    filter: string;
    sort: "asc" | "desc";
    search: string;
};

export type PokemonPokedex = {
    id: number;
    name: string;
};
