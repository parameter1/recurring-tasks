require('dotenv').config();
const { cleanEnv, makeValidator } = require('envalid');

const mongoDsn = makeValidator((str) => `${str}`.includes('mongodb://') && str);

module.exports = cleanEnv(process.env, {
  MONGO_DSN: mongoDsn({ desc: 'The Base MongoDB connection URL.' }),
});
