const { client, createBaseDB, filterDsn } = require('@recurring-tasks/db');
const createIndexes = require('./create-indexes');
const runQuery = require('./run-query');

const { TENANT_KEYS } = require('./env');

const { log } = console;
process.on('unhandledRejection', (e) => { log(e); throw e; });

const main = async () => {
  // Open MongoDB connections
  await client.connect().then((connection) => log(`MongoDB connected (${filterDsn(connection)})`));

  const keys = `${TENANT_KEYS}`.split(',');

  log(`Triggering build for published date collections: ${keys}`);
  await Promise.all(keys.map(async (tenant) => {
    const basedb = createBaseDB(tenant);
    await createIndexes(basedb);
    await runQuery(basedb);
  }));

  // Close MongoDB connections
  await client.close();
  log('MongoDB connection closed.');
};

process.on('unhandledRejection', (e) => { log(e); throw e; });
main().catch((e) => {
  log(e);
  setImmediate(() => { throw e; });
}).then(() => process.exit(0));
