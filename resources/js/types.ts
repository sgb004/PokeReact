export type ScreenActions = {
    name: string;
    content: string | JSX.Element;
    action: () => void;
};

export type ScreenFilters = {
    name: string;
    value: string;
};
