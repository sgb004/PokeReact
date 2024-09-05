import PokedexIcon from "../../Icons/PokedexIcon";

const InitialMessage = () => (
    <div className="initial-message flex flex-col">
        <p>Add Pokémon from the Pokédex:</p>
        <label
            htmlFor="navigation-button-pokemon-dispatcher"
            className="m-auto mt-[15px] cursor-pointer hover:text-icon-line"
        >
            <PokedexIcon
                className="transition-all ease-linear transition-linear hover:scale-110 hover:drop-shadow-pokedex-icon-hover"
                size={60}
            />
        </label>
    </div>
);

export default InitialMessage;
