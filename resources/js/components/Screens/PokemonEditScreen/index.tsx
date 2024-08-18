import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Pokemon } from "../../../types";

export type PokemonEditScreenElement = {
    setPokemon: (pokemon: Pokemon) => void;
} & HTMLDivElement;

export type PokemonEditScreenProps = {};

const PokemonEditScreen = forwardRef<
    PokemonEditScreenElement,
    PokemonEditScreenProps
>((_, ref) => {
    const screenRef = useRef<PokemonEditScreenElement>(null);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    console.log({ pokemon });

    useImperativeHandle(
        ref,
        () => {
            return {
                setPokemon,
            } as PokemonEditScreenElement;
        },
        []
    );

    return pokemon ? (
        <div
            ref={screenRef}
            className="pokemon-edit-screen absolute top-0 left-0 w-full h-full bg-info z-50"
        ></div>
    ) : (
        <></>
    );
});

export default PokemonEditScreen;
