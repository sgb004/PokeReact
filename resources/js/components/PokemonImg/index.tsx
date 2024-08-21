type PokemonImgProps = {
    number: number;
    className?: string;
};

const PokemonImg = ({ number, className = "" }: PokemonImgProps) => (
    <>
        <img
            className={`w-[80%] aspect-[1/1] ${className}`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
        />
    </>
);

export default PokemonImg;
