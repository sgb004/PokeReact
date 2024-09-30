const validateMaxMin = (
    name: string,
    value: number,
    max?: number,
    min?: number
) => {
    let error = "";

    if (max !== undefined && value > max) {
        error = `${name} must be less or equal than ${max}`;
    } else if (min !== undefined && value < min) {
        error = `${name} must be greater or equal than ${min}`;
    }

    return error;
};

export default validateMaxMin;
