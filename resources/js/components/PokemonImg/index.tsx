type PokemonImgProps = {
    id: number;
};

const PokemonImg = ({ id }: PokemonImgProps) => (
    <>
        {/* 
        <img
            className="w-[80%] aspect-[1/1]"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        />
		*/}
        <img
            className="w-[80%] aspect-[1/1]"
            src={`https://raws.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        />
    </>
);

export default PokemonImg;
