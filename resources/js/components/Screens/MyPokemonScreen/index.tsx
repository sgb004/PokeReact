import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { sendListPokemon } from "../actions";
import Screen from "../Screen";
import { PokemonPokedex, Sort } from "../../../types";
import PokemonImg from "../../PokemonImg";

export type MyPokemonScreenElement = {
    showRecentPokemon: (pokemon: PokemonPokedex[]) => void;
    current: HTMLDivElement | null;
} & HTMLDivElement;

const handleRemovePokemon = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    confirm: (sending: () => void) => void
) => {
    console.log("handleRemovePokemon");
    sendListPokemon({
        btn: event.currentTarget,
        screen: "pokemon-screen",
        url: "api/pokemon",
        method: "DELETE",
        messageError: "An error occurred while removing the Pokemon",
        confirm,
        successCallback: (pokemon) => {
            console.log(pokemon);
        },
    });
};

const MyPokemonScreen = forwardRef<MyPokemonScreenElement, {}>((props, ref) => {
    const screenRef = useRef(null);

    const dialogRef = useRef<HTMLDialogElement>(
        document.createElement("dialog")
    );
    const acceptCallback = useRef<() => void>(() => {});
    const confirmCallback = (sending: () => void) => {
        acceptCallback.current = sending;
        dialogRef.current.open = true;
    };

    const [recentPokemon, setRecentPokemon] = useState<PokemonPokedex[]>([]);

    useImperativeHandle(
        ref,
        () => {
            return {
                showRecentPokemon: setRecentPokemon,
                current: screenRef.current,
            } as MyPokemonScreenElement;
        },
        []
    );

    return (
        <Screen
            ref={screenRef}
            className="pokemon-screen"
            queryUrl="/api/pokemon"
            noPokemonMessage="No Pokémon were found"
            actions={[
                {
                    name: "transfer-pokemon",
                    action: (event) => {
                        handleRemovePokemon(event, confirmCallback);
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
            <section className="recent-pokemon screen-grid bg-screen-grid">
                {recentPokemon && recentPokemon.length > 0 ? (
                    <>
                        {recentPokemon.map((pokemon, index) => (
                            <label
                                key={index}
                                className="pokemon flex flex-col items-center relative cursor-pointer transition-all duration-75 ease"
                            >
                                <PokemonImg id={pokemon.id} />
                                <div className="name text-black first-letter:uppercase text-center">
                                    {pokemon.name}
                                </div>
                            </label>
                        ))}
                        <button
                            className=""
                            onClick={() => {
                                setRecentPokemon([]);
                            }}
                        >
                            Show recent pokemon
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </section>
        </Screen>
    );
});

export default MyPokemonScreen;
