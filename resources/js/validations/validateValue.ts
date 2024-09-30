const validateValue = (name: string, value: string | number | boolean) =>
    !value && value !== false ? `${name} is required` : "";

export default validateValue;
