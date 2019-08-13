import React from "react";
import { Link } from "react-router-dom";
function Pagination({ page, numTasks, perPage, completedQueryStr }) {
  return (
    <div>
      {page > 1 && (
        <Link
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 -
              1}&perPage=${perPage}${completedQueryStr}`
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
              1}&perPage=${perPage}${completedQueryStr}`
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
