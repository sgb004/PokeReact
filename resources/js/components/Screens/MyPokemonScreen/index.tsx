import Screen from "../Screen";

const handleRemovePokemon = () => {
    console.log("handleRemovePokemon");
};

const MyPokemonScreen = () => {
    return (
        <Screen
            className="pokemon-screen"
            queryUrl="/api/pokemon"
            noPokemonMessage="No Pokémon were found"
            actions={[
                {
                    name: "transfer-pokemon",
                    action: handleRemovePokemon,
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
            ]}
        />
    );
};

export default MyPokemonScreen;
