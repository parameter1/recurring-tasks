const { createMongoClient, createBaseDB } = require('@parameter1/base-cms-db');
const { filterDsn } = require('@parameter1/base-cms-db/utils');
const { MONGO_URI } = require('./env');

const client = createMongoClient(MONGO_URI, { appname: '@parameter1/recurring-tasks', useUnifiedTopology: true });

module.exports = {
  client,
  filterDsn,
  createBaseDB: (tenant) => createBaseDB({ tenant, client }),
};
