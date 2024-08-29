import { useEffect, useState } from "react";
import { Pokemon } from "../../../types";
import setFavorite from "../../../utils/setFavorite";

export type FavoriteProps = {
    pokemon: Pokemon;
    onChange: (favorite: boolean) => void;
};

const Favorite = ({ pokemon, onChange }: FavoriteProps) => {
    const [value, setValue] = useState(pokemon.favorite);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.checked);
        setFavorite(
            pokemon,
            event.currentTarget,
            (favorite) => {
                onChange(favorite);
            },
            () => {
                setValue(!event.currentTarget.checked);
            }
        );
    };

    useEffect(() => {
        setValue(pokemon.favorite);
    }, [pokemon]);

    return (
        <label className="favorite relative mb-auto text-icon-favorite cursor-pointer">
            <input
                type="checkbox"
                className="favorite-dispatcher absolute top-0 left-0 hidden"
                onChange={handleChange}
                checked={value}
            />
            <svg
                className="icon"
                width="15"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
            >
                <use
                    href="#icon-star"
                    className="fill-transparent transition-colors duration-[500ms]"
                />
            </svg>
        </label>
    );
};

export default Favorite;
