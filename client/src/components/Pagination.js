import React from "react";
import { Link } from "react-router-dom";
function Pagination({ page, tasks, perPage }) {
  console.log("pagination page", page);
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
      {page <= Math.ceil(tasks.length / perPage) && (
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
