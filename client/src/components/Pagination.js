import React from "react";
import { Link } from "react-router-dom";
function Pagination({ page, numTasks, perPage }) {
  return (
    <div>
      {page > 1 && (
        <Link
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 - 1}&perPage=${perPage}`
          }}
        >
          Prev
        </Link>
      )}
      {page < Math.ceil(numTasks / perPage) && (
        <Link
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 + 1}&perPage=${perPage}`
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
