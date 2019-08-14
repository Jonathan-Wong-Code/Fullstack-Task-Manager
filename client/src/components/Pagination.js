import React from "react";
import { Link } from "react-router-dom";
import useGetNumTasks from "./../hooks/useGetNumTasks";

function Pagination({ page, perPage, completedQueryStr, completed }) {
  const numTasks = useGetNumTasks(completed);

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
