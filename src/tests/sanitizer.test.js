const sanitize = require("../sanitizer/sanitizer")
const sanitizers = require('../sanitizer/sanitizerTypes')

it('should sanitize the user object', () => {
    const email = '   ITAY@gmail.com  '
    const name = '  Itay Tur  '
    const user = {
        email,
        name,
        address: 'tel aviv'
    }

    const userSanitizers = [
        {email: sanitizers.TRIM},
        {email: sanitizers.LOWER_CASE},
        {name: sanitizers.TRIM}
    ]

    const senitizedEmail = email.trim().toLowerCase()
    const senitizedName = name.trim()

    const sanitizedUser = sanitize(user, userSanitizers)
    expect(sanitizedUser.email).toBe(senitizedEmail)
    expect(sanitizedUser.name).toBe(senitizedName)
})