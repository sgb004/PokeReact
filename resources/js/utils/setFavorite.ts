import { addNotification } from "../components/Notifications";
import { Pokemon } from "../types";

const setFavorite = (pokemon: Pokemon, input: HTMLInputElement) => {
    const favorite = input.checked ? 1 : 0;
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    input.setAttribute("disabled", "disabled");

    fetch(`/api/pokemon/${pokemon.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            favorite,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(
                    favorite
                        ? `Error to set as a favorite the Pokémon ${name}`
                        : `Error to unset as a favorite the Pokemon ${name}`
                );
            }
        })
        .then(() => {
            addNotification(
                input,
                favorite
                    ? `${name} was set as favorite`
                    : `${name} was unset as favorite`,
                "success"
            );

            input.removeAttribute("disabled");
        })
        .catch((error) => {
            addNotification(input, error, "error");

            input.checked = !input.checked;
            input.removeAttribute("disabled");
        });
};

export default setFavorite;
