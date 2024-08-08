const dataToPokemon = (data: any) => {
    return {
        id: data.id,
        name: data.name,
        number: data.api_id,
        cp: data.cp,
        attack: data.attack,
        defense: data.defense,
        hp: data.hp,
        favorite: data.favorite === 1 ? true : false,
        enabled: true,
    };
};

export default dataToPokemon;
