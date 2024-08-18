import { useRef } from "react";
import PokemonScreen from "./PokemonScreen";
import MyPokemonScreen, { MyPokemonScreenElement } from "./MyPokemonScreen";
import Notifications from "../Notifications";
import PokemonEditScreen, {
    PokemonEditScreenElement,
} from "./PokemonEditScreen";

const Screens = () => {
    const myPokemonScreenRef = useRef<MyPokemonScreenElement>(null);
    const pokemonEditScreenRef = useRef<PokemonEditScreenElement>(null);

    return (
        <div className="screens notifications-container relative overflow-hidden col-start-1 col-end-3 border border-black m-[10px] rounded-[5px]">
            <div className="screens-content flex h-full transition-transform">
                <MyPokemonScreen
                    ref={myPokemonScreenRef}
                    pokemonEditScreenRef={pokemonEditScreenRef}
                />
                <PokemonScreen myPokemonScreenRef={myPokemonScreenRef} />
                <PokemonEditScreen ref={pokemonEditScreenRef} />
            </div>
            <Notifications />
        </div>
    );
};

export default Screens;
