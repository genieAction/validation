const validator = require('validator')
const validationTypes = require('./validationTypes')

const tests = {
    [validationTypes.IS_EMAIL]: value => validator.isEmail(value),
    [validationTypes.IS_LETTERS_ONLY]: value => validator.isAlpha(value),
    [validationTypes.IS_LENGTH]: (value, { min, max }) => validator.isLength(value, { min, max }),
    [validationTypes.IS_BIGGER_THEN]: (value, { limit }) => value.length >= limit,
    [validationTypes.IS_SMALLER_THEN]: (value, { limit }) => value.length <= limit,
    [validationTypes.IS_EMPTY]: value => validator.isEmpty(value, { ignore_whitespace: true }),
    [validationTypes.IS_NUMERIC_ONLY]: value => validator.isNumeric(value, { no_symbols: true }),
    [validationTypes.IS_DATE]: value => validator.isDate(value),
    [validationTypes.IS_MOBILE_PHONE]: value => validator.isMobilePhone(value),
    [validationTypes.IS_CREDIT_CARD]: value => validator.isCreditCard(value),
    [validationTypes.IS_URL]: (value) => validator.isURL(value),
    [validationTypes.IS_URLS]: values => values.every(value => validator.isURL(value)),
    [validationTypes.IS_WORDS]: value => value.split(' ').every(word => validator.isAlpha(word))
}

const isValidObject = (obj, validations, alloweds) => {
    if (alloweds) {
        const fields = Object.keys(obj);
        if (!fields.every(field => alloweds.includes(field))) return false;
    }
    for (let validation of validations) {
        const property = Object.keys(validation)[0]
        const value = obj[property]
        const test = validation[property]
        let isValid = true
        try {
            if (value) isValid = tests[test](value, validation.options)
            else if (test === validationTypes.IS_NOT_EMPTY) isValid = false
            if (!isValid) return false;
        } catch (error) {
            console.log(error)
        }
    }
    return true;
}

module.exports = isValidObject