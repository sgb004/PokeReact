import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { sendListPokemon } from "../actions";
import Screen, { ScreenElement } from "../Screen";
import { Pokemon } from "../../../types";
import Recent from "./Recent";
import PokemonElement from "./PokemonElement";
import { PokemonEditScreenElement } from "../PokemonEditScreen";

export type MyPokemonScreenElement = {
    element: ScreenElement | null;
    showRecentPokemon: (pokemon: Pokemon[]) => void;
} & HTMLDivElement;

export type MyPokemonScreenProps = {
    pokemonEditScreenRef: React.RefObject<PokemonEditScreenElement>;
};

const handleRemovePokemon = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    confirm: (sending: () => void) => void,
    screen: ScreenElement | null
) => {
    sendListPokemon({
        btn: event.currentTarget,
        screen: "pokemon-screen",
        url: "api/pokemon",
        method: "DELETE",
        messageError: "An error occurred while removing the Pokemon",
        confirm,
        successCallback: (_, pokemonSelected) => {
            const grid = screen?.grid;

            if (grid) {
                let pokemonList = grid.getPokemon();
                pokemonList = pokemonList.filter(
                    (pokemon) => !pokemonSelected.includes(pokemon.id)
                );
                grid.setPokemon(pokemonList);
            }
        },
    });
};

const MyPokemonScreen = forwardRef<
    MyPokemonScreenElement,
    MyPokemonScreenProps
>(({ pokemonEditScreenRef }, ref) => {
    const screenRef = useRef<ScreenElement>(null);

    const dialogRef = useRef<HTMLDialogElement>(
        document.createElement("dialog")
    );
    const acceptCallback = useRef<() => void>(() => {});
    const confirmCallback = (sending: () => void) => {
        acceptCallback.current = sending;
        dialogRef.current.open = true;
    };

    const [recentPokemon, setRecentPokemon] = useState<Pokemon[]>([]);

    const handleShowRecentPokemon = () => {
        const { header } = screenRef?.current ?? {};
        const { filter, sort } = header?.getParams() ?? {};

        if (filter == "recent" && sort == "desc") {
            screenRef?.current?.grid?.reset();
        } else {
            header?.setParams({
                filter: "recent",
                sort: "desc",
                search: "",
            });
        }
    };

    useImperativeHandle(
        ref,
        () => {
            return {
                element: screenRef.current,
                showRecentPokemon: setRecentPokemon,
            } as MyPokemonScreenElement;
        },
        []
    );

    return (
        <>
            <svg className="screen-icons">
                <defs>
                    <symbol id="icon-sword" viewBox="0 0 30 30">
                        <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        >
                            <path
                                d="M8.443 14.614L19.528 1.196l9.305-.03-.029 9.306-13.418 11.085M11.914 18.086l8.751-8.751"
                                strokeWidth="2.3336"
                            />
                            <path
                                d="M9.303 24.139l-4.36 4.36a1.167 1.167 0 01-1.649 0L1.5 26.707a1.167 1.167 0 010-1.648l4.361-4.361a1.167 1.167 0 000-1.663L2.828 16a1.167 1.167 0 010-1.663L4.665 12.5a1.167 1.167 0 011.663 0L17.5 23.672a1.167 1.167 0 010 1.663l-1.837 1.837a1.167 1.167 0 01-1.663 0l-3.034-3.033a1.167 1.167 0 00-1.663 0z"
                                strokeWidth="2.3336"
                            />
                        </g>
                    </symbol>
                    <symbol id="icon-shield" viewBox="0 0 30 30">
                        <path
                            d="M1.167 11.215V2.372a1.258 1.205 0 011.258-1.205h25.15a1.258 1.205 0 011.258 1.205v8.843c0 12.654-11.208 16.842-13.44 17.55a1.132 1.085 0 01-.786 0c-2.232-.708-13.44-4.896-13.44-17.55z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.334"
                        />
                    </symbol>
                    <symbol id="icon-heart" viewBox="0 0 30 30">
                        <path
                            d="M15 28.833S1.167 20.03 1.167 9.34A7.193 8.174 0 0115 6.198v0A7.193 8.174 0 0128.833 9.34C28.833 20.031 15 28.833 15 28.833z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.334"
                        />
                    </symbol>
                    <symbol id="icon-star" viewBox="0 0 30 30">
                        <path
                            d="M15.586 24.24l6.718 4.427c.866.568 1.932-.276 1.68-1.314l-1.947-7.942a1.16 1.204 0 01.387-1.217l6.024-5.216c.786-.678.387-2.048-.64-2.117l-7.863-.526a1.106 1.148 0 01-.973-.747L16.04 1.923a1.106 1.148 0 00-2.08 0l-2.932 7.665a1.106 1.148 0 01-.973.747l-7.863.526c-1.027.069-1.426 1.439-.64 2.117l6.024 5.216a1.16 1.204 0 01.387 1.217l-1.8 7.36c-.306 1.246.973 2.256 2 1.578l6.25-4.109a1.093 1.135 0 011.173 0z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.334"
                        />
                    </symbol>
                    <symbol id="icon-pencil" viewBox="0 0 30 30">
                        <g
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        >
                            <path
                                d="M24 1.2L28.8 6 14.4 20.4H9.6v-4.8zM20.4 4.8l4.8 4.8"
                                strokeWidth="2.4"
                            />
                            <path
                                d="M27.6 14.4v13.2a1.2 1.2 0 01-1.2 1.2h-24a1.2 1.2 0 01-1.2-1.2v-24a1.2 1.2 0 011.2-1.2h13.2"
                                strokeWidth="2.4"
                            />
                        </g>
                    </symbol>
                </defs>
            </svg>
            <Screen
                ref={screenRef}
                className="pokemon-screen"
                queryUrl="/api/pokemon"
                noPokemonMessage="No Pokémon were found"
                actions={[
                    {
                        name: "transfer-pokemon",
                        action: (event) => {
                            handleRemovePokemon(
                                event,
                                confirmCallback,
                                screenRef.current
                            );
                        },
                        content: (
                            <svg
                                width="40"
                                height="40"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 40 40"
                                className="fill-icon-transfer stroke-icon-transfer-border block"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="1"
                                    transform="matrix(.86164 0 0 .8405 7.059 7.334)"
                                >
                                    <path
                                        className="transition-all"
                                        d="M11.152 7.377H29.52v5.77h-29L11.152 2.57z"
                                    />
                                    <path
                                        className="transition-all"
                                        d="M18.886 22.762H.519v-5.77h29L18.886 27.57z"
                                    />
                                </g>
                            </svg>
                        ),
                    },
                ]}
                filters={[
                    {
                        name: "Number",
                        value: "number",
                    },
                    {
                        name: "Name",
                        value: "name",
                    },
                    {
                        name: "CP",
                        value: "cp",
                    },
                    {
                        name: "Attack",
                        value: "attack",
                    },
                    {
                        name: "Defense",
                        value: "defense",
                    },
                    {
                        name: "HP",
                        value: "hp",
                    },
                    {
                        name: "Favorite",
                        value: "favorite",
                    },
                    {
                        name: "Recent",
                        value: "recent",
                    },
                ]}
                printGridItems={(pokemon: Pokemon) => (
                    <PokemonElement
                        key={pokemon.id}
                        pokemon={pokemon}
                        onEdit={(pokemon) => {
                            pokemonEditScreenRef.current?.setPokemon(pokemon);
                        }}
                    />
                )}
            >
                <dialog
                    ref={dialogRef}
                    className="absolute top-0 left-0 w-full h-full animate-backdrop-grey-scale z-10"
                >
                    <div className="w-full h-full flex items-center justify-center p-[15px]">
                        <form
                            method="dialog"
                            className="bg-white min-w-[200px] p-[15px] rounded-[5px] animate-in"
                        >
                            <p className="leading-[1.3] mb-[10px]">
                                Are you sure you want to transfer the selected
                                Pokémon?
                            </p>
                            <div className="flex justify-center gap-[10px]">
                                <button className="dialog-btn">No</button>
                                <button
                                    className="dialog-btn"
                                    onClick={() => {
                                        acceptCallback.current();
                                    }}
                                >
                                    Yes
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>

                {recentPokemon && recentPokemon.length > 0 ? (
                    <Recent
                        recentPokemon={recentPokemon}
                        setRecentPokemon={setRecentPokemon}
                        handleShowRecentPokemon={handleShowRecentPokemon}
                    />
                ) : (
                    <></>
                )}
            </Screen>
        </>
    );
});

export default MyPokemonScreen;
