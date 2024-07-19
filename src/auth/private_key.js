require('dotenv').config();

const privateKey = process.env.CUSTOM_PRIVATE_KEY;

if (!privateKey) {
    throw new Error('CUSTOM_PRIVATE_KEY is not defined in the .env file');
}

module.exports = privateKey;
