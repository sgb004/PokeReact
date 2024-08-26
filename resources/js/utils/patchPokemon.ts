import { addNotification } from "../components/Notifications";
import { Pokemon } from "../types";

const patchPokemon = (
    pokemon: Pokemon,
    element: HTMLElement,
    successCallback: () => void
) => {
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    fetch(`/api/pokemon/${pokemon.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            cp: pokemon.cp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            hp: pokemon.hp,
            favorite: pokemon.favorite,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Error to update the Pokémon ${name}`);
            }
        })
        .then(() => {
            addNotification(element, `${name} was updated`, "success");
            successCallback();
        })
        .catch((error) => {
            addNotification(element, error, "error");
        });
};

export default patchPokemon;
