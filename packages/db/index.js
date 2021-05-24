const { createMongoClient } = require('@parameter1/base-cms-db');
const { MONGO_DSN } = require('./env');

module.exports = createMongoClient(MONGO_DSN, { appname: '@parameter1/recurring-tasks', useUnifiedTopology: true });
