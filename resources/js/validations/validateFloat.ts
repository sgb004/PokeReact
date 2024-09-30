import validateMaxMin from "./validateMaxMin";

const validateFloat = (
    name: string,
    value: string | number,
    max?: number,
    min?: number
) => {
    let error = `${name} must be a number`;

    if (/^-?[0-9]+(\.[0-9]+)?$/.test(`${value}`)) {
        error = validateMaxMin(name, parseFloat(`${value}`), max, min);
    }

    return error;
};

export default validateFloat;
