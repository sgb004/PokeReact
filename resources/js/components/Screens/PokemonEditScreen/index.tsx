import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Pokemon } from "../../../types";
import ScreenFooter from "../ScreenFooter";

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
            className="pokemon-edit-screen screen absolute top-0 left-0 w-full h-full z-50 bg-[#faf8ef]"
        >
            <section>
                <div className="cp">
                    <span className="cp-title text-[11px]">CP</span>
                    <span className="cp-value text-[18px]">{pokemon.cp}</span>
                </div>
            </section>
            <ScreenFooter
                actions={[
                    {
                        name: "edit-save",
                        content: (
                            <svg
                                height="40"
                                width="40"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 40 40"
                            >
                                <path
                                    d="M8.669 23.848a2.325 2.325 0 010-3.27l1.178-1.171a2.125 2.125 0 013.053.034l2.082 2.16a1.062 1.062 0 001.542 0l10.61-10.937a2.127 2.127 0 013.07-.018l1.144 1.157a2.324 2.324 0 010 3.234L17.262 29.35a2.125 2.125 0 01-3.038.02z"
                                    fill="currentColor"
                                    stroke="none"
                                />
                            </svg>
                        ),
                        action: () => {},
                    },
                    {
                        name: "edit-cancel",
                        content: (
                            <svg
                                height="40"
                                width="40"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 40 40"
                            >
                                <path
                                    d="M31.255 27.464a2.556 2.556 0 010 3.614l-.166.165c-1.001 1-2.623 1-3.625 0l-6.574-6.568c-.5-.5-1.312-.5-1.813 0l-6.557 6.562a2.565 2.565 0 01-3.627 0l-.146-.145a2.556 2.556 0 01.013-3.632l6.627-6.552c.51-.5.51-1.323 0-1.823L8.762 12.54a2.557 2.557 0 01-.013-3.633l.145-.145a2.56 2.56 0 011.813-.75c.709 0 2.442 1.376 2.905 1.841l5.465 5.466c.5.501 1.313.501 1.813 0l6.574-6.562c1.001-1 2.623-1 3.625 0l.166.172a2.556 2.556 0 010 3.614l-6.546 6.554c-.5.498-.5 1.307 0 1.805z"
                                    fill="currentColor"
                                    stroke="none"
                                />
                            </svg>
                        ),
                        action: () => setPokemon(null),
                    },
                ]}
            />
        </div>
    ) : (
        <></>
    );
});

export default PokemonEditScreen;
