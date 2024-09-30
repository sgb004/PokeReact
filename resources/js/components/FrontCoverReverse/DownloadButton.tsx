import { getAllPokemonIndexedDB } from "../../indexedDB/driver";
import { PokemonDataIndexedDB } from "../../types";
import appUseIndexedDB from "../../utils/appUseIndexedDB";
import { addNotification } from "../Notifications";

const DownloadPokemon = (button: HTMLAnchorElement) => {
    getAllPokemonIndexedDB()
        .then((pokemon: PokemonDataIndexedDB[]) => {
            const pokemonData = pokemon.map((pokemon) => {
                return {
                    name: pokemon.name,
                    api_id: pokemon.number,
                    cp: pokemon.cp,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                    hp: pokemon.hp,
                    favorite: pokemon.favorite,
                    created_at: new Date(pokemon.created_at),
                    updated_at: new Date(pokemon.updated_at),
                };
            });
            const data = JSON.stringify(pokemonData);
            const blob = new Blob([data], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            button.href = url;
            button.download = "pokedex.json";
            button.click();

            setTimeout(() => {
                button.href = "#";
                button.setAttribute("download", "");
            }, 100);
        })
        .catch((error) => {
            console.error(error);
            addNotification(button, "Error to download the Pokémon", "error");
        });
};

const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.href.split("/").pop();

    if (href === "#") {
        event.preventDefault();
        DownloadPokemon(event.currentTarget);
    }
};

const DownloadButton = () => {
    const [href, handleButtonClick] = appUseIndexedDB
        ? ["#", handleClick]
        : ["/my-pokedex/download", () => {}];

    return (
        <a className="simple-button" href={href} onClick={handleButtonClick}>
            <svg
                className="icon [transform:rotateY(180deg)_rotateX(180deg)]"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
            >
                <use xlinkHref="#icon-arrow"></use>
            </svg>
        </a>
    );
};

export default DownloadButton;
