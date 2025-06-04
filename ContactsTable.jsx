import React, { useState, useMemo } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaFileExport } from "react-icons/fa";
import "../../styles/Contacts/ContactsTable.css"; 

const ContactsTable = () => {
  // Sample Realistic Contacts Data
  const initialData = useMemo(() => [
    { id: 1, name: "Emma Watson", email: "emma.watson@gmail.com", phone: "987-654-1230", role: "HR Manager" },
    { id: 2, name: "Michael Johnson", email: "michael.johnson@company.com", phone: "555-234-6789", role: "Software Engineer" },
    { id: 3, name: "Sophia Roberts", email: "sophia.roberts@company.com", phone: "876-432-9876", role: "Project Manager" },
    { id: 4, name: "David Lee", email: "david.lee@company.com", phone: "654-987-3210", role: "Marketing Lead" },
    { id: 5, name: "Olivia Martinez", email: "olivia.martinez@company.com", phone: "765-987-6543", role: "Sales Executive" },
    { id: 6, name: "William Brown", email: "william.brown@company.com", phone: "908-654-1234", role: "CTO" },
    { id: 7, name: "Charlotte Wilson", email: "charlotte.wilson@company.com", phone: "765-432-6789", role: "Business Analyst" },
    { id: 8, name: "Daniel Harris", email: "daniel.harris@company.com", phone: "432-765-0987", role: "Customer Support" },
    { id: 9, name: "Ella Thomas", email: "ella.thomas@company.com", phone: "789-123-6540", role: "UX Designer" },
    { id: 10, name: "James Walker", email: "james.walker@company.com", phone: "678-234-9870", role: "Product Manager" },
  ], []);

  // State for Contacts Data
  const [contactsData, setContactsData] = useState(initialData);

  // Table Columns
  const columns = useMemo(() => [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "name" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phone" },
    { Header: "Role", accessor: "role" },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <div className="actions">
          <button className="delete-btn" onClick={() => handleDelete(row.original.id)}>
            <FaTrash /> Delete
          </button>
        </div>
      ),
    },
  ], []);

  // React Table Hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: contactsData,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Search State
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setGlobalFilter(e.target.value);
  };

  // Delete Contact Function
  const handleDelete = (id) => {
    const updatedContacts = contactsData.filter(contact => contact.id !== id);
    setContactsData(updatedContacts);
  };

  // Export to CSV Function
  const exportToCSV = () => {
    const csvRows = [];
    const headers = columns.map(col => col.Header).join(",");
    csvRows.push(headers);
    contactsData.forEach(row => {
      const values = columns.map(col => row[col.accessor] || "").join(",");
      csvRows.push(values);
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="contacts-table-container">
      {/* Search and Export */}
      <div className="table-header">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="export-btn" onClick={exportToCSV}>
          <FaFileExport /> Export
        </button>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table {...getTableProps()} className="contacts-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />) : <FaSort />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} key={cell.id}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage} className="small-btn">Prev</button>
        <span> Page {pageIndex + 1} </span>
        <button onClick={nextPage} disabled={!canNextPage} className="small-btn">Next</button>
      </div>
    </div>
  );
};

export default ContactsTable;
