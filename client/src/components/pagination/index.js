import React from "react";
import { Link } from "react-router-dom";
import useGetNumTasks from "../../hooks/useGetNumTasks";

function Pagination({
  page,
  perPage,
  completedQueryStr,
  completed,
  completedSortStr
}) {
  const numTasks = useGetNumTasks(completed);
  console.log(numTasks);
  return (
    <div>
      {page > 1 && (
        <Link
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 -
              1}&perPage=${perPage}${completedQueryStr}${completedSortStr}`
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
              1}&perPage=${perPage}${completedQueryStr}${completedSortStr}`
          }}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default Pagination;
