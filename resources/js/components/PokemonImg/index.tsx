type PokemonImgProps = {
    number: number;
    className?: string;
};

const PokemonImg = ({ number, className = "" }: PokemonImgProps) => (
    <>
        <img
            className={`pokemon-img w-[80%] aspect-[1/1] ${className} transition-opacity opacity-0`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
            onLoad={(event) => {
                event.currentTarget.classList.add("opacity-100");
            }}
            onError={(event) => {
                event.currentTarget.src = "/images/question.svg";
            }}
        />
    </>
);

export default PokemonImg;
