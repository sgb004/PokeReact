import PokemonScreen from "./PokemonScreen";
import MyPokemonScreen from "./MyPokemonScreen";
import Notifications from "../Notifications";

const Screens = () => {
    return (
        <div className="screens notifications-container relative overflow-hidden col-start-1 col-end-3 border border-black m-[10px] rounded-[5px]">
            <div className="screens-content flex h-full transition-transform">
                <MyPokemonScreen />
                <PokemonScreen />
            </div>
            <Notifications />
        </div>
    );
};

export default Screens;
