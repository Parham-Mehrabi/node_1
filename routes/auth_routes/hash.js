const bcrypt = require('bcrypt')

async function hashPassword(raw_password) {
    // this function create a separated salt for each password and hash the raw password with it


    const salt = await bcrypt.genSalt(5)
    // default round is 10 but we put 5 here since we don't want to stress our machine for a demo project
    const hashedPassword = await bcrypt.hash(raw_password, salt)
    return hashedPassword
}

module.exports = hashPassword
