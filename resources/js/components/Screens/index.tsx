import React from "react";
import PokemonScreen from "./PokemonScreen";
import MyPokemonScreen from "./MyPokemonScreen";

const Screens = () => {
    return (
        <div className="screens overflow-hidden col-start-1 col-end-3 border border-black m-[10px] rounded-[5px]">
            <div className="screens-content flex h-full transition-transform">
                <MyPokemonScreen />
                <PokemonScreen />
            </div>
        </div>
    );
};

export default Screens;
