import { Pokemon } from "../../../types";
import dataToPokemon from "../../../utils/dataToPokemon";
import NotFoundMessage from "../../NotFoundMessage";
import PokemonImg from "../../PokemonImg";
import { sendListPokemon } from "../actions";
import { MyPokemonScreenElement } from "../MyPokemonScreen";
import Screen from "../Screen";
import InitialMessage from "./InitialMessage";

type PokemonScreenProps = {
    myPokemonScreenRef: React.RefObject<MyPokemonScreenElement>;
};

const handleAddPokemon = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    showRecentPokemon: (pokemon: Pokemon[]) => void
) => {
    sendListPokemon({
        btn: event.currentTarget,
        screen: "pokedex-screen",
        url: "api/pokemon",
        method: "POST",
        messageError: "An error occurred while adding the Pokemon",
        successCallback: (pokemon) => {
            const list = pokemon.map((pokemon) => dataToPokemon(pokemon));
            showRecentPokemon(list);
        },
    });
};

const PokemonScreen = ({ myPokemonScreenRef }: PokemonScreenProps) => {
    return (
        <Screen
            className="pokedex-screen"
            queryUrl="/api/pokedex"
            noPokemonMessage={<NotFoundMessage />}
            initialMessage={<InitialMessage />}
            actions={[
                {
                    name: "add-pokemon",
                    action: (event) => {
                        handleAddPokemon(
                            event,
                            myPokemonScreenRef?.current?.showRecentPokemon ??
                                (() => {})
                        );
                    },
                    content: (
                        <svg
                            height="30"
                            width="30"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 30 30"
                            className="fill-accept-icon block w-[60%] h-[60%]"
                        >
                            <path d="M27.799 11.863h-9.657l.012-9.832c-.039-.68-.33-2.025-1.99-2.028L13.803 0c-1.766-.001-1.917 1.742-1.926 2.198l-.012 9.664h-9.88C.162 11.862.008 13.269 0 13.67v2.705c.009.369.16 1.761 1.986 1.761h9.872l-.012 9.871c-.003 1.823 1.404 1.98 1.807 1.989l2.705.003c.37-.009 1.762-.16 1.765-1.983l.012-9.879h9.84c.68-.04 2.025-.333 2.025-1.993v-2.36c-.002-1.765-1.745-1.913-2.201-1.922z" />
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
            ]}
            printGridItems={(pokemon: Pokemon) => (
                <label
                    key={pokemon.number}
                    className="pokemon flex flex-col items-center relative cursor-pointer transition-all duration-75 ease"
                >
                    <input
                        type="checkbox"
                        name="pokemon_from_pokedex"
                        value={pokemon.number}
                        className="pokemon-from-pokedex absolute top-0 left-0 hidden"
                    />
                    <PokemonImg number={pokemon.number} />
                    <div className="name text-black first-letter:uppercase text-center">
                        {pokemon.name}
                    </div>
                </label>
            )}
        />
    );
};

export default PokemonScreen;
