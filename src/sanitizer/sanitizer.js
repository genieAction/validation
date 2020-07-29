const validator = require('validator')
const sanitizerTypes = require('./sanitizerTypes')

const sanitizers = {
    [sanitizerTypes.LOWER_CASE]: value => value.toLowerCase(),
    [sanitizerTypes.TRIM]: value => validator.trim(value)
}

const sanitize = (obj, objSanitizers) => {
    const objToReturn = {...obj}
    for ( let objSanitizer of objSanitizers) {
        const property = Object.keys(objSanitizer)[0]
        const senitizer = objSanitizer[property]
        const value = objToReturn[property]
        objToReturn[property] = sanitizers[senitizer](value)
    }
    return objToReturn
}

module.exports = sanitize