require("dotenv").config();

const dbConfig = {
    mangodb: {
        url: process.env.MANGODB_URL,
        name: process.env.MANGODB_NAME,
    }
};

module.exports = dbConfig;