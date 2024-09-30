const validateArrayInJSON = (data: string) => {
    let result = { error: "", dataParsed: [] };

    try {
        result.dataParsed = JSON.parse(data);
        if (result.dataParsed.length === 0) {
            result.error = "The array must not be empty";
        }
    } catch (error) {
        console.error(error);
        result.error = "The data must be a valid JSON array";
    }

    return result;
};

export default validateArrayInJSON;
