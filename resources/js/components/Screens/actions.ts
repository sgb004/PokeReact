import { Pokemon } from "../../types";
import { fetchSendingListPokemon } from "../../utils/fetchMethods";
import { addNotification } from "../Notifications";

export type PokemonFunctionParams = {
    btn: EventTarget & HTMLButtonElement;
    url: string;
    method: "GET" | "POST" | "DELETE";
    messageError: string;
    successCallback: (pokemon: Pokemon[], pokemonSelected: number[]) => void;
    errorCallback?: (
        pokemon: NodeListOf<HTMLInputElement>,
        pokemonSelected: number[]
    ) => void;
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
    const pokemonSelected: number[] = [];

    const enablePokemonSelected = () => {
        for (const item of selected) {
            item.checked = false;
            item.removeAttribute("disabled");
        }
    };

    for (const item of selected) {
        pokemonSelected.push(parseInt(item.value));
        item.setAttribute("disabled", "true");
    }

    btn.classList.add("loading");

    fetchSendingListPokemon(
        url,
        {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pokemon: pokemonSelected,
            }),
        },
        messageError
    )
        .then((data) => {
            successCallback(data.pokemon, pokemonSelected);

            addNotification(btn, data.message, "success");

            btn.classList.remove("loading");
            enablePokemonSelected();
        })
        .catch((error) => {
            if (errorCallback) {
                errorCallback(selected, pokemonSelected);
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
