import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Table = ({ columns, data, onViewLink, onEditLink, onDelete }) => {
  const tableColumns = ["No", ...columns];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table bg-white">
        <thead>
          <tr>
            {tableColumns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-black text-left text-xs leading-4 font-medium uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="border-t border-gray-300 text-ellipsis">
              <td className="px-6 py-4 whitespace-no-wrap">
                {index + 1}
              </td>
              {columns.map((column) => (
                <td
                  key={`${row.id}-${column}`}
                  className="px-6 py-4 whitespace-no-wrap"
                >
                  {row[column]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-no-wrap">
                <Link
                  to={onViewLink(row.id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Lihat
                </Link>
                <Link
                  to={onEditLink(row.id)}
                  className="text-green-500 hover:text-green-700 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(row.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onViewLink: PropTypes.func.isRequired,
  onEditLink: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Table;
