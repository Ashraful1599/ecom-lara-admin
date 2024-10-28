// Pagination.tsx
import React from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    previousLabel={"Previous"}
    nextLabel={"Next"}
    breakLabel={"..."}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={onPageChange}
    containerClassName={"pagination"}
    activeClassName={"active"}
  />
);

export default Pagination;
