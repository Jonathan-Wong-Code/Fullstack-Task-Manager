import React from "react";
import { LinkButton } from "../../themes/general";
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
        <LinkButton
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 -
              1}&perPage=${perPage}${completedStr}${sortStr}${searchStr}`
          }}
        >
          Prev
        </LinkButton>
      )}
      {page < Math.ceil(numTasks / perPage) && (
        <LinkButton
          to={{
            pathname: "/dashboard",
            search: `?page=${page * 1 +
              1}&perPage=${perPage}${completedStr}${sortStr}${searchStr}`
          }}
        >
          Next
        </LinkButton>
      )}
    </div>
  );
}

export default Pagination;
