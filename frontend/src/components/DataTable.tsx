/**
 * DataTable component implemented using @tanstack/react-table, for more information visit https://tanstack.com/table/latest
 */
import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { PaginatedData } from "../types/PaginatedData";

interface TableStyle {
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}

interface DataTableProps<T extends object> {
  columns: ColumnDef<T, unknown>[]; // Definition of columns for react table
  inputData?: T[]; // data to display in table when the table is not paginated
  fetchData?: (page: number, perPage: number) => Promise<PaginatedData<T>>; // function to fetch data when server side pagination is used (for now this table does not support client side pagination)
  usePagination?: boolean; // Set to true to toggle server side pagination
  onRowClick?: (row: T) => void; // Event emitter for row click
  tableStyle?: TableStyle;
}

const DataTable = <T extends object>({
  columns,
  inputData,
  fetchData,
  usePagination = false,
  onRowClick,
  tableStyle,
}: DataTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data using fetchData() when server side pagination is used
  useEffect(() => {
    const loadData = async () => {
      if (usePagination && fetchData) {
        setLoading(true);
        const response = await fetchData(page, pageSize);
        setData(response.data);
        setTotalItems(response.total);
        setLoading(false);
      }
    };

    loadData();
  }, [page, pageSize, usePagination, fetchData]);

  useEffect(() => {
    if (!usePagination && inputData) {
      setData(inputData);
      setTotalItems(inputData.length);
      setLoading(false);
    }
  }, [inputData, usePagination]);

  // Create react-table instance
  const table = useReactTable<T>({
    data,
    columns,
    pageCount: Math.ceil(totalItems / pageSize), // Required for server-side pagination
    state: {
      pagination: {
        pageIndex: page,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      // 'updater' can be a function or an object
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: page, pageSize })
          : updater;
      setPage(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    manualPagination: true, // Enable manual pagination for server-side
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // TODO: Render spinner when loading async data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 table">
      <div style={tableStyle} className="overflow-y-auto">
        <table className="border-collapse border border-gray-200">
          {/* Generate Headers (Column names) */}
          <thead className="bg-gray-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b p-2 text-left"
                    style={{
                      width: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Generate Table Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100"
                onClick={() => onRowClick && onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b p-2"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* TODO: Style pagination */}
      {usePagination && (
        <div className="mt-4">
          <button onClick={() => setPage(0)} disabled={page === 0}>
            {"<<"}
          </button>{" "}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={(page + 1) * pageSize >= totalItems}
          >
            {">"}
          </button>{" "}
          <button
            onClick={() => setPage(Math.floor(totalItems / pageSize))}
            disabled={(page + 1) * pageSize >= totalItems}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {page + 1} of {Math.ceil(totalItems / pageSize)}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={page + 1}
              min={1}
              max={Math.ceil(totalItems / pageSize)}
              onChange={(e) => {
                const newPage = Number(e.target.value) - 1;
                setPage(
                  newPage >= 0 && newPage < Math.ceil(totalItems / pageSize)
                    ? newPage
                    : 0,
                );
              }}
              style={{ width: "50px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default DataTable;
