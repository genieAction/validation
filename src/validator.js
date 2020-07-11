const validator = require('validator')

const tests = {
    isEmail: value => validator.isEmail(value),
    isStringOnly: value => validator.isAlpha(value),
    isLength: (value, { min, max }) => validator.isLength(value, { min, max }),
    isBiggerThan: (value, { limit }) => value.length >= limit,
    isSmallerThan: (value, { limit }) => value.length <= limit,
    isEmpty: value => validator.isEmpty(value),
    isNumericOnly: value => validator.isNumeric(value, { no_symbols: true }),
    isDate: value => validator.isDate(value),
    isMobilePhone: value => validator.isMobilePhone(value),
    isCreditCard: value => validator.isCreditCard(value),
    isUrl(value) { return validator.isUrl(value, { require_protocol: true })},
    isUrlArray: values => values.every(value => this.isUrl(value))
}

const validateObject = (obj, validations) => {
    let isValid = true
    for (let validation of validations) {
        const property = Object.keys(validation)[0]
        const value = obj[property]
        const test = validation[property]
        isValid = isValid && tests[test](value, validation.options)
    }
    return isValid
}

module.exports = validateObject