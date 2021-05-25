module.exports = async (basedb) => {
  const collection = await basedb.collection('platform', 'content-published-dates');
  await collection.createIndexes([
    {
      key: {
        siteId: 1,
      },
      background: true,
      name: 'siteId',
    },
    {
      key: {
        date: 1,
        siteId: 1,
      },
      background: true,
      name: 'date_siteId',
    },
  ]);
};
