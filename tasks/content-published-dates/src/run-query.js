const now = new Date();

module.exports = async (basedb) => {
  const collection = await basedb.collection('platform', 'Content');
  const r = await collection.aggregate([
    {
      $match: {
        status: 1,
        published: { $lte: now },
        $and: [
          {
            $or: [
              { unpublished: { $exists: false } },
              { unpublished: { $gte: now } },
            ],
          },
          {
            $or: [
              { 'mutations.Website.noIndex': { $exists: false } },
              { 'mutations.Website.noIndex': false },
            ],
          },
        ],
      },
    },
    {
      $project: {
        siteId: '$mutations.Website.primarySite',
        date: { $dateToString: { format: '%Y-%m-%d', date: '$published' } },
        published: 1,
      },
    },
    {
      $group: {
        _id: {
          siteId: '$siteId',
          date: '$date',
          year: { $year: '$published' },
          month: { $month: '$published' },
          day: { $dayOfMonth: '$published' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        siteId: '$_id.siteId',
        year: '$_id.year',
        month: '$_id.month',
        day: '$_id.day',
        date: '$_id.date',
        count: 1,
      },
    },
    { $out: 'content-published-dates' },
  ]);
  return r.toArray();
};
