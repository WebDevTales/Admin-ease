import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import "../../styles/Invoices/InvoicesCharts.css";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const InvoicesCharts = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  // Fetch invoices data from Firestore in real-time
  useEffect(() => {
    const invoicesCollectionRef = collection(db, "invoices");
    const unsubscribe = onSnapshot(invoicesCollectionRef, (snapshot) => {
      const fetchedInvoices = snapshot.docs.map((doc) => doc.data());
      setInvoiceData(fetchedInvoices);
    });

    return () => unsubscribe();
  }, []);

  // Process data for charts
  const calculateChartData = () => {
    const statusCounts = { Paid: 0, Pending: 0, Overdue: 0 };
    const statusAmounts = { Paid: 0, Pending: 0, Overdue: 0 };

    invoiceData.forEach((invoice) => {
      const status = invoice.status;
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
        statusAmounts[status] += parseFloat(invoice.amount);
      }
    });

    // Calculate total amount (sum of all statuses)
    const totalAmount = statusAmounts.Paid + statusAmounts.Pending + statusAmounts.Overdue;

    return { statusCounts, statusAmounts, totalAmount };
  };

  const { statusCounts, statusAmounts, totalAmount } = calculateChartData();

  // Bar Chart - Invoice Amounts by Status (Total Bar Removed)
  const barChartData = {
    labels: ["Paid", "Pending", "Overdue"], // Removed "Total"
    datasets: [
      {
        label: "Paid Amount ($)",
        data: [statusAmounts.Paid, statusAmounts.Pending, statusAmounts.Overdue], // Removed totalAmount
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"], // Green, Yellow, Red
        borderRadius: 5,
      },
    ],
  };

  // Doughnut Chart - Invoice Count by Status
  const doughnutChartData = {
    labels: ["Paid", "Pending", "Overdue"],
    datasets: [
      {
        label: "Invoice Count",
        data: [statusCounts.Paid, statusCounts.Pending, statusCounts.Overdue],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        cutout: "70%", // Semi-doughnut effect
      },
    ],
  };

  // Tooltip Configuration (Total Amount Still Included)
  const tooltipOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            const label = tooltipItem.label;
            const count = tooltipItem.raw; // Number of invoices
            const amount = Object.values(statusAmounts)[index];

            return [
              `${label}: ${count} invoices`,
              `Total: $${amount.toFixed(2)}`,
              `Grand Total: $${totalAmount.toFixed(2)}`, // Kept the Grand Total in the tooltip
            ];
          },
        },
      },
    },
  };

  return (
    <div className="charts-container">
      <div className="chart-box">
        <h3>Invoice Amounts by Status</h3>
        <Bar data={barChartData} options={tooltipOptions} />
      </div>
      <div className="chart-box">
        <h3>Invoice Count by Status</h3>
        <Doughnut data={doughnutChartData} options={tooltipOptions} />
      </div>
    </div>
  );
};

export default InvoicesCharts;
