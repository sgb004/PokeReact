import validateMaxMin from "./validateMaxMin";

const validateUnsignedInteger = (
    name: string,
    value: string | number,
    max?: number
) => {
    let error = `${name} must be an unsigned integer`;

    if (/^[0-9]+$/.test(`${value}`)) {
        error = validateMaxMin(name, parseInt(`${value}`), max);
    }

    return error;
};

export default validateUnsignedInteger;
