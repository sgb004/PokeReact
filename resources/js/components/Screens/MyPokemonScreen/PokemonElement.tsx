import { Pokemon, PokemonStatCSS } from "../../../types";
import setFavorite from "../../../utils/setFavorite";
import PokemonImg from "../../PokemonImg";

type StatProps = {
    name: string;
    value: number;
    icon: "icon-sword" | "icon-shield" | "icon-heart";
};

type PokemonProps = {
    pokemon: Pokemon;
};

const Stat = ({ name, value, icon }: StatProps) => (
    <span
        className={`stat ${name} block`}
        style={{ "--value": value } as PokemonStatCSS}
    >
        <span className="icon">
            <svg
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
            >
                <use href={`#${icon}`} />
            </svg>
            <svg
                className="over"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
            >
                <use href={`#${icon}`} />
            </svg>
        </span>
        {value}
    </span>
);

const PokemonElement = ({ pokemon }: PokemonProps) => (
    <div key={pokemon.id} className="pokemon p-[5px]">
        <label className="flex flex-col items-center relative cursor-pointer transition-all duration-75 ease">
            <div className="cp">
                <span className="cp-title text-[11px]">CP</span>
                <span className="cp-value text-[18px]">{pokemon.cp}</span>
            </div>
            <input
                type="checkbox"
                name="pokemon_from_pokedex"
                value={pokemon.id}
                className="pokemon-from-pokedex absolute top-0 left-0 hidden"
            />
            <PokemonImg number={pokemon.number} />
            <div className="name text-black first-letter:uppercase text-center">
                {pokemon.name}
            </div>
        </label>
        <div className="actions flex justify-center gap-[10px] p-[5px]">
            <label className="favorite mb-auto text-icon-favorite cursor-pointer">
                <input
                    type="checkbox"
                    value={pokemon.id}
                    className="favorite-dispatcher absolute top-0 left-0 hidden"
                    onChange={(event) =>
                        setFavorite(pokemon, event.currentTarget)
                    }
                    defaultChecked={pokemon.favorite}
                />
                <svg
                    className="icon"
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                >
                    <use
                        href="#icon-star"
                        className="fill-transparent transition-colors duration-[500ms]"
                    />
                </svg>
            </label>
            <div
                className={`pokemon-stats flex justify-center gap-[10px] text-center stats-${pokemon.attack}-${pokemon.defense}-${pokemon.hp}`}
            >
                <Stat name="attack" value={pokemon.attack} icon="icon-sword" />
                <Stat
                    name="defense"
                    value={pokemon.defense}
                    icon="icon-shield"
                />
                <Stat name="hp" value={pokemon.hp} icon="icon-heart" />
            </div>
            <button className="edit mb-auto w-[15px] h-[15px] center text-icon-edit flex justify-center items-center">
                <svg
                    width="13"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                >
                    <use href="#icon-pencil" />
                </svg>
            </button>
        </div>
    </div>
);

export default PokemonElement;
