import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Pokemon, SetPokemon } from "../../../types";
import ScreenFooter from "../ScreenFooter";
import PokemonImg from "../../PokemonImg";
import StatSlider from "../../StatSlider";
import patchPokemon from "../../../utils/patchPokemon";
import Dialog from "../../Dialog";

export type PokemonEditScreenElement = {
    setPokemon: (pokemon: Pokemon, updatePokemon: SetPokemon) => void;
} & HTMLDivElement;

export type PokemonEditScreenProps = {};

const PokemonEditScreen = forwardRef<
    PokemonEditScreenElement,
    PokemonEditScreenProps
>((_, ref) => {
    const screenRef = useRef<PokemonEditScreenElement>(null);
    const callback = useRef<SetPokemon>(() => {});
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [editing, setEditing] = useState(true);
    const [screenAnimation, setScreenAnimation] = useState("animate-open");
    const originalData = JSON.stringify(pokemon);

    const closeScreen = () => {
        screenRef.current?.addEventListener(
            "animationend",
            () => {
                setPokemon(null);
                setScreenAnimation("animate-open");
            },
            { once: true }
        );

        setScreenAnimation("animate-close");
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                setPokemon: (pokemon: Pokemon, updatePokemon: SetPokemon) => {
                    callback.current = updatePokemon;
                    setPokemon(pokemon);
                },
            } as PokemonEditScreenElement;
        },
        []
    );

    return pokemon ? (
        <div
            ref={screenRef}
            className={`pokemon-edit-screen screen absolute top-[100%] left-0 w-full h-full z-50 bg-edit-back ${screenAnimation} ${
                editing ? "editing" : "no-editing"
            }`}
        >
            <section className="p-[5px] h-full grid">
                <div className="cp flex justify-center h-[min-content] m-auto">
                    <span className="cp-title text-[1rem] mt-auto mr-[5px] pb-[6px]">
                        CP
                    </span>
                    <input
                        type="number"
                        className="cp-value text-[2rem] text-center outline-[1px] max-w-[110px]"
                        min={0}
                        max={4724}
                        defaultValue={pokemon.cp}
                        onChange={(event) => {
                            pokemon.cp = Number(event.target.value);
                        }}
                        disabled={!editing}
                    />
                </div>
                <PokemonImg number={pokemon.number} className="m-auto" />
                <div className="name flex justify-center h-[min-content] overflow-hidden p-[1px]">
                    <input
                        className="text-center text-[2rem] mb-auto mr-auto ml-auto max-w-[100%]"
                        defaultValue={pokemon.name}
                        onChange={(event) => {
                            pokemon.name = event.target.value;
                        }}
                        disabled={!editing}
                    />
                </div>
                <div className="stats mt-auto text-white">
                    <StatSlider
                        name="attack"
                        value={pokemon.attack}
                        className="mb-[5px]"
                        thumb={
                            <svg
                                className="fill-stats "
                                width="15"
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                            >
                                <g
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="16"
                                >
                                    <path
                                        d="M8.443 14.614L19.528 1.196l9.305-.03-.029 9.306-13.418 11.085M11.914 18.086l8.751-8.751"
                                        strokeWidth="2.3336"
                                    ></path>
                                    <path
                                        d="M9.303 24.139l-4.36 4.36a1.167 1.167 0 01-1.649 0L1.5 26.707a1.167 1.167 0 010-1.648l4.361-4.361a1.167 1.167 0 000-1.663L2.828 16a1.167 1.167 0 010-1.663L4.665 12.5a1.167 1.167 0 011.663 0L17.5 23.672a1.167 1.167 0 010 1.663l-1.837 1.837a1.167 1.167 0 01-1.663 0l-3.034-3.033a1.167 1.167 0 00-1.663 0z"
                                        strokeWidth="2.3336"
                                    ></path>
                                </g>
                            </svg>
                        }
                        onChange={(value) => {
                            pokemon.attack = value;
                        }}
                        disabled={!editing}
                    />
                    <StatSlider
                        name="defense"
                        value={pokemon.defense}
                        className="mb-[5px]"
                        thumb={
                            <svg
                                className="fill-stats"
                                width="15"
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                            >
                                <path
                                    d="M1.167 11.215V2.372a1.258 1.205 0 011.258-1.205h25.15a1.258 1.205 0 011.258 1.205v8.843c0 12.654-11.208 16.842-13.44 17.55a1.132 1.085 0 01-.786 0c-2.232-.708-13.44-4.896-13.44-17.55z"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.334"
                                ></path>
                            </svg>
                        }
                        onChange={(value) => {
                            pokemon.defense = value;
                        }}
                        disabled={!editing}
                    />
                    <StatSlider
                        name="hp"
                        value={pokemon.hp}
                        className="mb-[5px]"
                        thumb={
                            <svg
                                className="fill-stats"
                                width="15"
                                height="15"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                            >
                                <path
                                    d="M15 28.833S1.167 20.03 1.167 9.34A7.193 8.174 0 0115 6.198v0A7.193 8.174 0 0128.833 9.34C28.833 20.031 15 28.833 15 28.833z"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.334"
                                ></path>
                            </svg>
                        }
                        onChange={(value) => {
                            pokemon.hp = value;
                        }}
                        disabled={!editing}
                    />
                </div>
            </section>

            <Dialog
                ref={dialogRef}
                message="Do you want to exit without saving changes?"
                onAccept={closeScreen}
            />

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
                        action: (event) => {
                            setEditing(false);
                            patchPokemon(
                                pokemon,
                                event.currentTarget,
                                () => {
                                    callback.current({ ...pokemon });
                                    closeScreen();
                                    setEditing(true);
                                },
                                () => {
                                    setEditing(true);
                                }
                            );
                        },
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
                        action: () => {
                            if (!editing) return;

                            const currentData = JSON.stringify(pokemon);

                            if (currentData === originalData) {
                                closeScreen();
                            } else {
                                dialogRef.current instanceof
                                    HTMLDialogElement &&
                                    (dialogRef.current.open = true);
                            }
                        },
                    },
                ]}
            />
        </div>
    ) : (
        <></>
    );
});

export default PokemonEditScreen;
