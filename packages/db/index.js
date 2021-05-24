const { createMongoClient, createBaseDB } = require('@parameter1/base-cms-db');
const { filterDsn } = require('@parameter1/base-cms-db/utils');
const { MONGO_DSN } = require('./env');

const client = createMongoClient(MONGO_DSN, { appname: '@parameter1/recurring-tasks', useUnifiedTopology: true });

module.exports = {
  client,
  filterDsn,
  createBaseDB: (tenant) => createBaseDB({ tenant, client }),
};
