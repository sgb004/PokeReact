import React from "react";
import PokemonScreen from "./PokemonScreen";
import MyPokemonScreen from "./MyPokemonScreen";

const Screens = () => {
    return (
        <div className="screens overflow-hidden col-start-1 col-end-3">
            <div className="screens-content flex transition-transform">
                <MyPokemonScreen />
                <PokemonScreen />
            </div>
        </div>
    );
};

export default Screens;
