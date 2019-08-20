import React from "react";
import { Link } from "react-router-dom";

function Pagination({
  page,
  perPage,
  completedStr,
  sortStr,
  searchStr,
  numTasks
}) {
  return (
    <div>
      {page > 1 && (
        <Link
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 -
              1}&perPage=${perPage}${completedStr}${sortStr}${searchStr}`
          }}
        >
          Prev
        </Link>
      )}
      {page < Math.ceil(numTasks / perPage) && (
        <Link
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 +
              1}&perPage=${perPage}${completedStr}${sortStr}${searchStr}`
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
