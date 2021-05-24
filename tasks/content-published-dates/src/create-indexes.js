module.exports = async (basedb) => {
  const collection = await basedb.collection('platform', 'content-published-dates');
  await collection.createIndexes([
    {
      key: {
        year: 1,
        siteId: 1,
      },
      background: true,
      name: 'year_siteId',
    },
    {
      key: {
        year: 1,
        month: 1,
        siteId: 1,
      },
      background: true,
      name: 'year_month_siteId',
    },
  ]);
};
