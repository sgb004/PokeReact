import { PokemonPokedex } from "../../types";
import { addNotification } from "../Notifications";

export type PokemonFunctionParams = {
    btn: EventTarget & HTMLButtonElement;
    url: string;
    method: "GET" | "POST" | "DELETE";
    messageError: string;
    successCallback: (pokemon: PokemonPokedex[]) => void;
    errorCallback?: (pokemon: NodeListOf<HTMLInputElement>) => void;
};

export type SendingListPokemonParams = PokemonFunctionParams & {
    selected: NodeListOf<HTMLInputElement>;
};

export type SendListPokemonParams = PokemonFunctionParams & {
    screen: string;
    confirm?: (sending: () => void) => void;
};

const sendingListPokemon = ({
    btn,
    selected,
    url,
    method,
    messageError,
    successCallback,
    errorCallback,
}: SendingListPokemonParams) => {
    const pokemonSelected: string[] = [];

    const enablePokemonSelected = () => {
        for (const item of selected) {
            item.checked = false;
            item.removeAttribute("disabled");
        }
    };

    for (const item of selected) {
        pokemonSelected.push(item.value);
        item.setAttribute("disabled", "true");
    }

    btn.classList.add("loading");

    fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pokemon: pokemonSelected,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(messageError);
            }
        })
        .then((data) => {
            successCallback(data.pokemon);

            addNotification(btn, data.message, "success");

            btn.classList.remove("loading");
            enablePokemonSelected();
        })
        .catch((error) => {
            if (errorCallback) {
                errorCallback(selected);
            }

            addNotification(btn, error, "error");

            for (const item of selected) {
                item.checked = true;
            }
            btn.classList.remove("loading");
            enablePokemonSelected();
        });
};

export const sendListPokemon = ({
    btn,
    screen,
    url,
    messageError,
    method,
    confirm,
    successCallback,
    errorCallback,
}: SendListPokemonParams) => {
    const selected = document.querySelectorAll<HTMLInputElement>(
        `.${screen} .pokemon-from-pokedex:checked`
    );

    if (!btn.classList.contains("loading") && selected.length > 0) {
        const sending = () => {
            sendingListPokemon({
                btn,
                selected,
                url,
                method,
                messageError,
                successCallback,
                errorCallback,
            });
        };

        if (confirm) {
            confirm(sending);
        } else {
            sending();
        }
    } else {
        addNotification(btn, "Please select at least one Pokemon", "info");
    }
};