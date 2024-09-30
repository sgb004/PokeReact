const validateDate = (value: string) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
};

export const validateISO8601Date = (name: string, value: string) => {
    let error = `${name} must be a valid ISO 8601 date`;

    if (
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/.test(`${value}`) &&
        validateDate(value)
    ) {
        error = "";
    }

    return error;
};
