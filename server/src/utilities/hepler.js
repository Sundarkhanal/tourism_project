const crypto = require("crypto")
const Module = require("module")

const randomStringGenerator = (len) => {
    return crypto.randomBytes(len).toString("base64").slice(0, len)
}

module.exports = randomStringGenerator