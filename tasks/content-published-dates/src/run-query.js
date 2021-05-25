const now = new Date();

module.exports = async (basedb) => {
  const collection = await basedb.collection('platform', 'Content');
  return collection.aggregate([
    {
      $match: {
        status: 1,
        published: { $lte: now },
        $or: [
          { unpublished: { $exists: false } },
          { unpublished: { $gte: now } },
        ],
      },
    },
    {
      $project: {
        siteId: '$mutations.Website.primarySite',
        date: { $dateToString: { format: '%Y-%m-%d', date: '$published' } },
      },
    },
    {
      $group: {
        _id: { siteId: '$siteId', date: '$date' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        siteId: '$_id.siteId',
        date: '$_id.date',
        count: 1,
      },
    },
    { $out: 'content-published-dates' },
  ]);
};
