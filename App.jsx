import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader"; // ✅ Advanced Loader
import PrivateRoute from "./components/PrivateRoute";

// ✅ Lazy load pages for better performance
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Sales = lazy(() => import("./pages/Sales"));
const Products = lazy(() => import("./pages/Products"));
const Orders = lazy(() => import("./pages/Orders"));
const Invoices = lazy(() => import("./pages/Invoices"));
const BarCharts = lazy(() => import("./pages/Charts"));
// const GeoCharts = lazy(() => import("./pages/BubbleCharts"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Reviews = lazy(() => import("./pages/Reviews")); // ✅ Add Reviews Page
const UserGuide = lazy(() => import("./pages/UserGuide"));
const FAQPage = lazy(() => import("./pages/FAQ"));
const Profile = lazy(() => import("./pages/Profile")); // ✅ Add Profile Page
const ProductPage = lazy(() => import("./pages/ProductPage")); // ✅ Add ProductPage
const CartPage = lazy(() => import("./pages/CartPage")); // ✅ Add CartPage
const PaymentPage = lazy(() => import("./pages/PaymentPage")); // ✅ Add CheckoutPage

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Auth />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
          <Route path="/charts" element={<PrivateRoute><BarCharts /></PrivateRoute>} />
          {/* <Route path="/geo-charts" element={<PrivateRoute><GeoCharts /></PrivateRoute>} /> */}
          <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
          <Route path="/reviews" element={<PrivateRoute><Reviews /></PrivateRoute>} /> {/* ✅ Add Reviews Page */}
          <Route path="/user-guide" element={<PrivateRoute><UserGuide /></PrivateRoute>} />
          <Route path="/faq" element={<PrivateRoute><FAQPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> {/* ✅ Add Profile Page */}

          {/* Product Page Route */}
          <Route path="/products/:id" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><CartPage /></PrivateRoute>} />
          <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
          <Route path="/payment/:id" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />


          {/* 404 Not Found Route */}

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;