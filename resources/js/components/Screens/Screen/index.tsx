import React from "react";
import { ScreenActions, ScreenFilters } from "../../../types";
import ScreenHeader from "../ScreenHeader";

export type ScreenProps = {
    pokemon: [];
    noPokemonMessage: string;
    actions: ScreenActions[];
    filters?: ScreenFilters[];
};

const Screen = ({
    pokemon,
    noPokemonMessage,
    actions,
    filters,
}: ScreenProps) => {
    return (
        <div className="screen relative">
            <div className="screen-content">
                <ScreenHeader filters={filters} />
                <section>
                    {pokemon.length == 0 ? (
                        <div className="no-pokemon">{noPokemonMessage}</div>
                    ) : (
                        pokemon.map((pokemon) => (
                            <div className="pokemon"></div>
                        ))
                    )}
                </section>
                <footer>
                    {actions.map((action) => (
                        <button
                            key={action.name}
                            className={`screen-button-action ${action.name} flex justify-center items-center align-items-center absolute rounded-full border border-black w-[40px] h-[40px] bottom-[10px] right-[10px] transition-all`}
                            onClick={() => action.action()}
                        >
                            {action.content}
                        </button>
                    ))}
                </footer>
            </div>
        </div>
    );
};

export default Screen;
