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
      $group: {
        _id: {
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
        year: '$_id.year',
        month: '$_id.month',
        day: '$_id.day',
        count: 1,
      },
    },
    { $out: 'content-published-dates' },
  ]);
};
