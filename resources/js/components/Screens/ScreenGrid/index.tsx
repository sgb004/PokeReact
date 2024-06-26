import { useEffect, useRef, useState } from "react";
import { PokemonPokedex } from "../../../types";

type ScreenGridProps = {
    getUrl: string;
    noPokemonMessage: string;
};

const ScreenGrid = ({ getUrl, noPokemonMessage }: ScreenGridProps) => {
    const screenGridRef = useRef<HTMLDivElement>(null);
    const [pokemon, setPokemon] = useState<PokemonPokedex[]>([]);

    useEffect(() => {
        fetch(getUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPokemon(data.data);
            });
    }, [getUrl]);

    useEffect(() => {
        const screenGrid = screenGridRef.current;
        const handleWheel = (event: WheelEvent) => event.stopPropagation();

        if (screenGrid) {
            screenGrid.addEventListener("wheel", handleWheel);
        }

        return () => {
            if (screenGrid) {
                screenGrid.removeEventListener("wheel", handleWheel);
            }
        };
    }, []);

    return (
        <section
            ref={screenGridRef}
            className="grid grid-cols-3 overflow-y-auto overflow-x-hidden p-[5px] gap-[5px] bg-screen-grid"
        >
            {pokemon.length == 0 ? (
                <div className="no-pokemon col-start-1 col-end-4 flex justify-center items-center">
                    {noPokemonMessage}
                </div>
            ) : (
                pokemon.map((pokemon) => (
                    <div
                        key={pokemon.id}
                        className="pokemon flex flex-col items-center"
                    >
                        <img
                            className="w-[80%]"
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        />
                        <div className="name text-black first-letter:uppercase">
                            {pokemon.name}
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default ScreenGrid;
