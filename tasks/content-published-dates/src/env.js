require('dotenv').config();
const { cleanEnv, makeValidator } = require('envalid');

const array = makeValidator((val) => val.split(',').map((v) => `${v}`.trim()));

module.exports = cleanEnv(process.env, {
  TENANT_KEYS: array({ desc: 'An array (comma-separated) of tenant keys to run' }),
});
