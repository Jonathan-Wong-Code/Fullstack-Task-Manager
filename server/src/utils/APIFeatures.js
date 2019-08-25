class APIFeatures {
  constructor(returnedQueryObj, requestQuery) {
    this.returnedQueryObj = returnedQueryObj;
    this.requestQuery = requestQuery;
  }

  filter() {
    const query = { ...this.requestQuery };

    const excludedFields = ["sort", "fields", "limit", "page"];
    excludedFields.forEach(field => delete query[field]);
    const queryStr = JSON.parse(
      JSON.stringify(query).replace(/\b(gt|gte|lt|lte)\b/, match => `$${match}`)
    );

    if (queryStr) {
      queryStr.title = new RegExp(queryStr.title, "gi");
    }

    this.returnedQueryObj = this.returnedQueryObj.find(queryStr);
    return this;
  }

  sort() {
    if (this.requestQuery.sort) {
      const sortBy = this.requestQuery.sort.split(",").join(" ");
      this.returnedQueryObj = this.returnedQueryObj.sort(sortBy);
    } else {
      this.returnedQueryObj = this.returnedQueryObj.sort("createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.requestQuery.fields) {
      const limitedFields = this.requestQuery.fields.split(",").join(" ");
      this.returnedQueryObj = this.returnedQueryObj.select(limitedFields);
    } else {
      this.returnedQueryObj = this.returnedQueryObj.select("-__v");
    }
    return this;
  }

  paginate() {
    const limit = this.requestQuery.limit * 1;
    const page = this.requestQuery.page * 1;
    const skip = (page - 1) * limit;

    this.returnedQueryObj = this.returnedQueryObj.limit(limit).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
