/**
 * [[This method is used to encrypt value parameter using salt parameter]]
 * @param {[[String]]} salt  [[String use as salt in encrption process]]
 * @param {[[String]]} value [[String which will be encrypted]]
 */

function encryptPassword(salt, value) {
    var encryptedValue = crypto.createHmac('sha1', salt).update(value).digest('hex')
    return encryptedValue
}

function verifyPassword(user, password) {
    console.log(user.salt);
    
    var encryptedPassword = encryptPassword(user.salt, password);
    var passwordVerificationResult = (user.password == encryptedPassword) ? true : false;
    return passwordVerificationResult;
}

module.exports = {
    encryptPassword,
    verifyPassword
}