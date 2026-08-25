import React from "react";
import "../../styles/datatable.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Badge = ({ type, children }) => {
  return <span className={`dt-badge ${type}`}>{children}</span>;
};

const DataTable = ({ columns, data, onEdit, onDelete, className = "" }) => {
  return (
    <div className={`table-container ${className}`}>
      <table className="data-table" role="table" aria-label="Teacher list table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="empty-row">
              <td colSpan={columns.length}>No records found</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, cIdx) => {
                  if (col.render) return <td key={cIdx} data-label={col.header}>{col.render(row)}</td>;
                  return <td key={cIdx} data-label={col.header}>{row[col.accessor]}</td>;
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
