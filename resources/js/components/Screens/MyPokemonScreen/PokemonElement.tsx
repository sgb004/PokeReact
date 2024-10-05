import { useState } from "react";
import {
    Pokemon,
    SetPokemon,
    PokemonStatCSS,
    StatProps,
    PatchPokemon,
    PokemonAttrs,
} from "../../../types";
import PokemonImg from "../../PokemonImg";
import Favorite from "./Favorite";

type PokemonProps = {
    pokemon: Pokemon;
    onEdit: (
        pokemon: Pokemon,
        setPokemon: SetPokemon,
        patchPokemon: PatchPokemon
    ) => void;
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

const PokemonElement = ({ pokemon, onEdit }: PokemonProps) => {
    const [data, setData] = useState<Pokemon>(pokemon);
    const patchPokemon = (
        key: PokemonAttrs,
        value: string | number | boolean
    ) => {
        setData({ ...data, [key]: value });
    };

    return (
        <div
            key={data.id}
            id={`my-pokemon-${data.id}`}
            className="pokemon p-[5px]"
        >
            <label className="flex flex-col items-center relative cursor-pointer transition-all duration-75 ease">
                <div className="cp">
                    <span className="cp-title text-[11px]">CP</span>
                    <span className="cp-value text-[18px]">{data.cp}</span>
                </div>
                <input
                    type="checkbox"
                    name="pokemon_from_pokedex"
                    value={data.id}
                    className="pokemon-from-pokedex absolute top-0 left-0 hidden"
                />
                <PokemonImg number={data.number} />
                <div className="name text-black first-letter:uppercase text-center">
                    {data.name}
                </div>
            </label>
            <div className="actions flex justify-center gap-[10px] p-[5px] max-[425px]:flex-wrap">
                <Favorite
                    pokemon={data}
                    onChange={(favorite) => {
                        data.favorite = favorite;
                    }}
                />
                <div
                    className={`pokemon-stats flex justify-center gap-[10px] text-center stats-${data.attack}-${data.defense}-${data.hp} max-[425px]:order-1`}
                >
                    <Stat name="attack" value={data.attack} icon="icon-sword" />
                    <Stat
                        name="defense"
                        value={data.defense}
                        icon="icon-shield"
                    />
                    <Stat name="hp" value={data.hp} icon="icon-heart" />
                </div>
                <button
                    className="edit mb-auto w-[15px] h-[15px] center text-icon-edit flex justify-center items-center"
                    onClick={() => onEdit(data, setData, patchPokemon)}
                >
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
};

export default PokemonElement;
