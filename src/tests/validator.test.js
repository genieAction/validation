const { isValidObject, isValidValue } = require('../validator/validator')
const validationTypes = require('../validator/validationTypes')

it('should return true on a valid object', () => {
    const user = {
        name: 'itay',
        lastName: 'tur',
        phone: '0544234545',
        email: 'itay@gmail.com',
        credit: '4444333322221111',
        city: 'rishon le zion',
        img: 'https://homepagehttpss.cae.wisc.edu/~ece533/images/airplane.png',
        images: [
            'https://homepagehttpss.cae.wisc.edu/~ece533/images/airplane.png',
            'https://homepagehttpss.cae.wisc.edu/~ece533/images/airplane.png'
        ],
        date: '2023-07-15'
    }

    const userValidations = [
        { name: validationTypes.IS_LETTERS_ONLY },
        { name: validationTypes.IS_REQUIRED },
        { lastName: validationTypes.IS_LETTERS_ONLY },
        { phone: validationTypes.IS_MOBILE_PHONE },
        { email: validationTypes.IS_EMAIL },
        { credit: validationTypes.IS_CREDIT_CARD },
        { city: validationTypes.IS_WORDS },
        { img: validationTypes.IS_URL },
        { images: validationTypes.IS_URLS },
        { date: validationTypes.IS_DATE },
        { date: validationTypes.IS_AFTER, options: { beforeTime: '2022-07-15' } },
    ]

    const alloweds = Object.keys(user)

    const isValid = isValidObject(user, userValidations, alloweds)
    expect(isValid).toBe(true)
});

it('Should return true on a valid value', () => {
    const email = 'itay@gmail.com'
    const validations = [{ type: validationTypes.IS_EMAIL }]
    const isValid = isValidValue(email, validations)
    expect(isValid).toBe(true)
})

it('Should return false on a invalid value', () => {
    const name = '1234'
    const validations = [{ type: validationTypes.IS_LETTERS_ONLY }]
    const isValid = isValidValue(name, validations)
    expect(isValid).toBe(false)
})

it('Should return false on a invalid on empty and required value', () => {
    const name = ''
    const validations = [{ type: validationTypes.IS_REQUIRED }]
    const isValid = isValidValue(name, validations)
    expect(isValid).toBe(false)
})