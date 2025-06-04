import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import "../../styles/Products/ProductManager.css";

Modal.setAppElement("#root");

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "", // Added category field
    status: "private",
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["Electronics", "Clothing", "Home Appliances", "Books", "Toys"]; // Example categories

  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    });
    return () => unsubscribe();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), formData);
      setFormData({ name: "", description: "", price: "", image: null, category: "", status: "private" });
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  // Update status
  const handleStatusChange = async (id, status) => {
    try {
      await updateDoc(doc(db, "products", id), { status });
    } catch (error) {
      console.error("Status error:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Open update modal
  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setIsUpdateModalOpen(true);
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "products", selectedProduct.id), {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        category: selectedProduct.category, // Added category to update
      });
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Export to CSV
  const handleExport = () => {
    const csvHeaders = ["Name", "Description", "Price", "Category", "Status"].join(",");
    const csvRows = products.map((p) => [p.name, p.description, p.price, p.category, p.status].join(","));
    const csvContent = `data:text/csv;charset=utf-8,${csvHeaders}\n${csvRows.join("\n")}`;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "products.csv";
    link.click();
  };

  // React Table setup
  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Description", accessor: "description" },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => `$${value}`, // Add dollar sign
      },
      {
        Header: "Category", // Added category column
        accessor: "category",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => <img src={value} alt="Product" className="product-image" />,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <select
            value={row.original.status}
            onChange={(e) => handleStatusChange(row.original.id, e.target.value)}
          >
            <option value="private">Private</option>
            <option value="publish">Publish</option>
          </select>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="action-buttons">
            <button style={{ color: "blue" }} onClick={() => window.open(`/products/${row.original.id}`, "_blank")}>
              <FaEye />
            </button>
            <button style={{ color: "orange" }} onClick={() => openUpdateModal(row.original)}>
              <FaEdit />
            </button>
            <button style={{ color: "red" }} onClick={() => handleDelete(row.original.id)}>
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
  });

  return (
    <div className="product-manager">
      <div className="table-section">
        <div className="table-header">
          <h2>Products</h2>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleExport} className="export-btn">Export CSV</button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Form */}
      <div className="form-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
          <select name="category" value={formData.category} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input type="file" onChange={handleImageUpload} required />
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Update Product Modal */}
      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Update Product</h2>
          <button onClick={() => setIsUpdateModalOpen(false)} className="close-button">&times;</button>
        </div>
        {selectedProduct && (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              required
            />
            <textarea
              value={selectedProduct.description}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              required
            />
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              required
            />
            <select
              name="category"
              value={selectedProduct.category}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button type="submit">Update</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ProductManager;
