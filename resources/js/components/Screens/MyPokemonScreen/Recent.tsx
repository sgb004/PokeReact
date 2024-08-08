import { Pokemon } from "../../../types";
import PokemonImg from "../../PokemonImg";

type Props = {
    recentPokemon: Pokemon[];
    setRecentPokemon: (pokemon: Pokemon[]) => void;
    handleShowRecentPokemon: () => void;
};

const Recent = ({
    recentPokemon,
    setRecentPokemon,
    handleShowRecentPokemon,
}: Props) => {
    return (
        <section
            className="recent-pokemon grid grid-rows-[0fr] bg-screen-grid-recent animate-show-recent border-b-[1px] border-t-[1px]"
            onAnimationEnd={(event) => {
                if (event.animationName === "hide-recent") {
                    setRecentPokemon([]);
                }
            }}
        >
            <div className="overflow-hidden mt-auto">
                <div className="recent-pokemon-content screen-grid grid-rows-[1fr_1fr] gap-y-[4px] p-[5px]">
                    {recentPokemon.map((pokemon, index) => (
                        <label
                            key={index}
                            className="pokemon row-start-1 row-end-3 flex flex-col items-center relative cursor-pointer transition-all duration-75 ease"
                        >
                            <PokemonImg number={pokemon.number} />
                            <div className="name text-black first-letter:uppercase text-center">
                                {pokemon.name}
                            </div>
                        </label>
                    ))}
                    <button
                        className="recent-pokemon-action-btn"
                        onClick={(event) => {
                            handleShowRecentPokemon();
                            event.currentTarget.classList.add("go-out");
                        }}
                    >
                        Show recent
                    </button>
                    <button
                        className="recent-pokemon-action-btn"
                        onClick={(event) => {
                            event.currentTarget.classList.add("go-out");
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Recent;
