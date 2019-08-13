import React from "react";

// const reducer = (state, newState) => {
//   return { ...state, ...newState };
// };

function FilterBar({ perPage, page, history }) {
  return (
    <form action="">
      <label htmlFor="perPage">Number of results</label>
      <select
        name="perPage"
        id="perPage"
        value={perPage}
        onChange={e => {
          history.push(`dashboard?page=${page}&perPage=${e.target.value}`);
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </form>
  );
}

export default FilterBar;
