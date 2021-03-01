const advanceResults = (Model, populate) => async (req, res, next) => {
  const { query } = req;
  const reqQuery = { ...query };

  // fields to exclude
  excludeFields = ["select", "sort", "page", "limit"];

  // loop over fields and delete them from requery
  excludeFields.forEach((key) => delete reqQuery[key]);

  // create query string
  let queryString = JSON.stringify(reqQuery);

  //create operators($operator)
  queryString = queryString.replace(
    /\b(gt | gte | in | lt | lte)\b/,
    (match) => `$${match}`
  );

  // finding resource
  let myQuery = Model.find(JSON.parse(queryString));

  // select fields
  if (query.select) {
    const fields = query.select.split(",").join(" ");
    myQuery = myQuery.select(fields);
  }

  // sort
  if (query.sort) {
    const sortBy = query.sort.split(",").join(" ");
    myQuery = myQuery.sort(sortBy);
  } else {
    myQuery = myQuery.sort("name");
  }

  // pagination
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 1;
  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;
  const total = await Model.countDocuments();
  myQuery = myQuery.skip(startIndex).limit(limit);

  if (populate) {
    myQuery = myQuery.populate(populate);
  }

  // executing query
  const results = await myQuery;
  // pagination results
  const pagination = {};
  if (lastIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advanceResults = {
      success: true,
      count: results.length,
      pagination,
      data: results
  }
  next()
};

module.exports = advanceResults;