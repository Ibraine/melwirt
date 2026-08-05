import React from "react";
import "../../styles/pagination.css";

const PaginationControl = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxShown = 5;
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxShown - 1);
  if (end - start < maxShown - 1) start = Math.max(1, end - maxShown + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="pagination-container" role="navigation" aria-label="Pagination">
      <button
        className="pg-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ‹
      </button>

      {start > 1 && (
        <>
          <button className="pg-num" onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="pg-ellipsis">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`pg-num ${p === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(p)}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="pg-ellipsis">…</span>}
          <button className="pg-num" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className="pg-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};

export default PaginationControl;
