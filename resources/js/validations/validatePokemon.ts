import { PokemonDataIndexedDB, ResponseValidation } from "../types";
import validateArrayInJSON from "./validateArrayInJSON";
import { validateISO8601Date } from "./validateDate";
import validateUnsignedInteger from "./validateUnsignedInteger";
import validateValue from "./validateValue";

const validatePokemon = (pokemon: PokemonDataIndexedDB, index: string = "") => {
    const errors: string[] = [];

    let error = "";

    if ((error = validateValue(`${index}api_id`, pokemon.api_id))) {
        errors.push(error);
    } else if (
        (error = validateUnsignedInteger(`${index}api_id`, pokemon.api_id))
    ) {
        errors.push(error);
    }

    if ((error = validateValue(`${index}name`, pokemon.name))) {
        errors.push(error);
    }

    if ((error = validateUnsignedInteger(`${index}cp`, pokemon.cp, 4724))) {
        errors.push(error);
    }

    if (
        (error = validateUnsignedInteger(`${index}attack`, pokemon.attack, 15))
    ) {
        errors.push(error);
    }

    if (
        (error = validateUnsignedInteger(
            `${index}defense`,
            pokemon.defense,
            15
        ))
    ) {
        errors.push(error);
    }

    if ((error = validateUnsignedInteger(`${index}hp`, pokemon.hp, 15))) {
        errors.push(error);
    }

    if (!RegExp(/^[01]$/).test(`${pokemon.favorite}`)) {
        errors.push(`${index}favorite must be a boolean (0 or 1)`);
    }

    if (
        (error = validateISO8601Date(
            `${index}created_at`,
            `${pokemon.created_at}`
        ))
    ) {
        errors.push(error);
    }

    if (
        (error = validateISO8601Date(
            `${index}updated_at`,
            `${pokemon.updated_at}`
        ))
    ) {
        errors.push(error);
    }

    return errors;
};

const validateApiIds = (ids: number[], pokemon: PokemonDataIndexedDB[]) =>
    new Promise<string[]>((resolve, reject) => {
        fetch(`api/pokedex/validate_api_ids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([...new Set(ids)]),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(
                        "There was an error to validate the API ID"
                    );
                }
            })
            .then((response) => {
                const errors = response.map((api_id: number) => {
                    const index = pokemon.findIndex(
                        (pokemon: PokemonDataIndexedDB) =>
                            pokemon.api_id === api_id
                    );
                    return index === -1 ? "" : `${index}.api_id is not valid`;
                });

                resolve(errors);
            })
            .catch((error) => {
                console.error(error);
                reject("Error to try to validate the API ID");
            });
    });

const validateArrayPokemon = (data: string) => {
    const { error, dataParsed } = validateArrayInJSON(data);

    let errors = dataParsed
        .map((pokemon, index) => validatePokemon(pokemon, `${index}.`))
        .flatMap((result) => result);

    if (!error && errors.length === 0) {
        const ids = dataParsed.map(
            (pokemon: PokemonDataIndexedDB) => pokemon.api_id
        );

        return new Promise<ResponseValidation>((resolve, reject) =>
            validateApiIds(ids, dataParsed)
                .then((errors) =>
                    resolve({
                        success: errors.length === 0,
                        pokemon: dataParsed,
                        errors,
                    })
                )
                .catch(reject)
        );
    } else {
        return Promise.resolve({
            success: false,
            pokemon: dataParsed,
            errors: errors,
        });
    }
};

export default validateArrayPokemon;
