const validateValue = (name: string, value: string | number | boolean) => {
    const val = value.toString().trim();
    return !val ? `${name} is required` : "";
};

export default validateValue;
