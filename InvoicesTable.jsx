import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import "../../styles/Invoices/InvoicesTable.css";
import { FaPlus, FaFileExport, FaSearch, FaTrash, FaCheck, FaClock, FaExclamationCircle } from "react-icons/fa";

const InvoicesTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: "",
    customerName: "",
    date: "",
    status: "Pending",
    amount: "",
  });

  const invoicesCollectionRef = collection(db, "invoices");

  // Fetch Data from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(invoicesCollectionRef, (snapshot) => {
      const fetchedInvoices = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvoices(fetchedInvoices);
    });

    return () => unsubscribe();
  }, []);

  // Handle Add Invoice
  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if (!newInvoice.invoiceNumber || !newInvoice.customerName || !newInvoice.date || !newInvoice.amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(invoicesCollectionRef, {
        invoiceNumber: newInvoice.invoiceNumber,
        customerName: newInvoice.customerName,
        date: newInvoice.date,
        status: newInvoice.status,
        amount: parseFloat(newInvoice.amount),
      });

      setNewInvoice({ invoiceNumber: "", customerName: "", date: "", status: "Pending", amount: "" });
      showToast(`Invoice added successfully!`, "success");
    } catch (error) {
      console.error("Error adding invoice: ", error);
    }
  };

  // Handle Status Change
  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      const invoiceRef = doc(db, "invoices", invoiceId);
      await updateDoc(invoiceRef, { status: newStatus });
      showToast(`Status updated to ${newStatus}`, "success");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle Bulk Status Update
  const handleBulkStatusUpdate = async (newStatus) => {
    try {
      for (const invoiceId of selectedInvoices) {
        const invoiceRef = doc(db, "invoices", invoiceId);
        await updateDoc(invoiceRef, { status: newStatus });
      }
      showToast(`Bulk status updated to ${newStatus}`, "success");
      setSelectedInvoices([]);
    } catch (error) {
      console.error("Error updating bulk status:", error);
    }
  };

  // Handle Bulk Deletion
  const handleBulkDelete = async () => {
    try {
      for (const invoiceId of selectedInvoices) {
        const invoiceRef = doc(db, "invoices", invoiceId);
        await deleteDoc(invoiceRef);
      }
      showToast("Selected invoices deleted", "error");
      setSelectedInvoices([]);
    } catch (error) {
      console.error("Error deleting invoices:", error);
    }
  };

  // Handle Invoice Selection for Bulk Actions
  const handleInvoiceSelection = (invoiceId) => {
    setSelectedInvoices((prevSelected) =>
      prevSelected.includes(invoiceId)
        ? prevSelected.filter((id) => id !== invoiceId)
        : [...prevSelected, invoiceId]
    );
  };

  // Export Data as CSV
  const exportToCSV = () => {
    const csvContent = [
      ["Invoice Number", "Customer Name", "Date", "Status", "Amount"],
      ...invoices.map((invoice) => [
        invoice.invoiceNumber,
        invoice.customerName,
        invoice.date,
        invoice.status,
        `$${invoice.amount.toFixed(2)}`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Toast Notification
  const showToast = (message, type) => {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  // Filtered Invoices (Search Functionality)
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.date.includes(searchTerm) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoice-container">
      {/* Notification */}
      {/* Toast notifications appear on top (they are appended to the body) */}

      {/* Left Side - Invoice Table */}
      <div className="invoice-table">
        <div className="table-header">
          <h2>Invoices</h2>
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={exportToCSV} className="export-btn">
            <FaFileExport /> Export CSV
          </button>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleInvoiceSelection(invoice.id)}
                    />
                  </td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.customerName}</td>
                  <td>{invoice.date}</td>
                  <td>
                    <select
                      className={`status-badge status-${invoice.status.toLowerCase()}`}
                      value={invoice.status}
                      onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                  <td>${invoice.amount.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No matching invoices</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Bulk Action Buttons (displayed below the table) */}
        {selectedInvoices.length > 0 && (
          <div className="bulk-actions">
            <button onClick={() => handleBulkStatusUpdate("Paid")} className="action-btn mark-paid">
              <FaCheck /> Mark as Paid
            </button>
            <button onClick={() => handleBulkStatusUpdate("Pending")} className="action-btn mark-read">
              <FaClock /> Mark as Pending
            </button>
            <button onClick={() => handleBulkStatusUpdate("Overdue")} className="action-btn mark-overdue">
              <FaExclamationCircle /> Mark as Overdue
            </button>
            <button onClick={handleBulkDelete} className="action-btn delete-btn">
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Right Side - Invoice Form */}
      <div className="invoice-form">
        <h3>Add Invoice</h3>
        <form onSubmit={handleAddInvoice}>
          <input type="text" placeholder="Invoice Number" value={newInvoice.invoiceNumber} onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })} required />
          <input type="text" placeholder="Customer Name" value={newInvoice.customerName} onChange={(e) => setNewInvoice({ ...newInvoice, customerName: e.target.value })} required />
          <input type="date" value={newInvoice.date} onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })} required />
          <input type="number" placeholder="Amount" value={newInvoice.amount} onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })} required />
          <button type="submit" className="button">
            <FaPlus /> Add Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoicesTable;
