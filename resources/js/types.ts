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
