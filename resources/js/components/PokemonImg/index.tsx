type PokemonImgProps = {
    number: number;
};

const PokemonImg = ({ number }: PokemonImgProps) => (
    <>
        <img
            className="w-[80%] aspect-[1/1]"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
        />
    </>
);

export default PokemonImg;
