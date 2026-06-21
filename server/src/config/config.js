
require("dotenv").config();

const dbConfig = {
    mangodb: {
        url: process.env.MANGODB_URL,
        name: process.env.MANGODB_NAME,
    }
};

const smtpConfig = {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    from: process.env.SMTP_FROM
}

module.exports = {
    dbConfig,
    smtpConfig

};