import { addNotification } from "../components/Notifications";
import { Pokemon } from "../types";
import { fetchSetFavorite } from "./fetchList";

type Callback = (favorite: boolean) => void;

const setFavorite = (
    pokemon: Pokemon,
    input: HTMLInputElement,
    successCallback: Callback,
    errorCallback?: Callback
) => {
    const isFavorite = input.checked;
    const favorite = isFavorite ? 1 : 0;
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const errorMessage = favorite
        ? `Error to set as a favorite the Pokemon ${name}`
        : `Error to unset as a favorite the Pokemon ${name}`;

    input.setAttribute("disabled", "disabled");

    fetchSetFavorite(
        `/api/pokemon/${pokemon.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                favorite,
            }),
        },
        errorMessage
    )
        .then(() => {
            addNotification(
                input,
                favorite
                    ? `${name} was set as favorite`
                    : `${name} was unset as favorite`,
                "success"
            );

            input.removeAttribute("disabled");

            successCallback(isFavorite);
        })
        .catch((error) => {
            console.error(error);
            addNotification(input, errorMessage, "error");

            input.removeAttribute("disabled");

            errorCallback && errorCallback(isFavorite);
        });
};

export default setFavorite;
