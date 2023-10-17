require('dotenv').config();

const {
  PORT, JWT_SECRET, MONGOOSE_DB_URL, NODE_ENV,
} = process.env;

const ENV_PORT = PORT || 3000;
const JWT_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'some-secret-key';
const DB_HOST = MONGOOSE_DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  ENV_PORT, JWT_KEY, DB_HOST,
};
