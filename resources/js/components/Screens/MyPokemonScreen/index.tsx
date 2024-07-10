import Screen from "../Screen";

const MyPokemonScreen = () => {
    return (
        <Screen
            className="pokemon-screen"
            queryUrl="/api/pokemon"
            noPokemonMessage="No Pokémon were found"
            actions={[]}
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
