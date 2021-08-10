const { client, createBaseDB, filterDsn } = require('@recurring-tasks/db');
const createIndexes = require('./create-indexes');
const runQuery = require('./run-query');

const { log } = console;
process.on('unhandledRejection', (e) => { log(e); throw e; });

const getTenantKeys = async () => {
  const collection = await client.collection('platform', 'base-browse-config');
  return collection.distinct('_id');
};

const main = async () => {
  // Open MongoDB connections
  await client.connect().then((connection) => log(`MongoDB connected (${filterDsn(connection)})`));

  const keys = await getTenantKeys();

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
