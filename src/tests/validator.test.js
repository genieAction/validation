const isValidObject = require('../validator/validator')
const validationTypes =  require('../validator/validationTypes')

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
        ]
    }

    const userValidations = [
        {name: validationTypes.IS_LETTERS_ONLY},
        {name: validationTypes.IS_REQUIRED},
        {lastName: validationTypes.IS_LETTERS_ONLY},
        {phone: validationTypes.IS_MOBILE_PHONE},
        {email: validationTypes.IS_EMAIL},
        {credit: validationTypes.IS_CREDIT_CARD},
        {city: validationTypes.IS_WORDS},
        {img: validationTypes.IS_URL},
        {images: validationTypes.IS_URLS}
    ]

    const alloweds = Object.keys(user)

    const isValid = isValidObject(user, userValidations, alloweds)
    expect(isValid).toBe(true)
});