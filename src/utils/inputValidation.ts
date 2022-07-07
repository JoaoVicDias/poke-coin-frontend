export const onValidationFormHandler = (validationRules: any, value: string) => {
    let isValid = true

    if (validationRules.isEmail) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        isValid = emailRegex.test(value) && isValid
    }

    if (validationRules.isRequired) {
        if (typeof value === 'string') {
            isValid = value?.trim() !== "" && isValid
        } else {
            isValid = value !== null && isValid
        }
    }

    if (validationRules.minLength) {
        isValid = value.trim().length >= validationRules.minLength && isValid
    }

    if (validationRules.maxLength) {
        isValid = value.trim().length <= validationRules.maxLength && isValid
    }

    return isValid
}