import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/AppLayouts";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../routes/ProtectedRoutes";

// Public pages
import Landing from "../pages/Landing";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import OTPVerificationPage from "../pages/OtpVerificationPage";

// Admin / Staff pages
import AdminDashboard from "../pages/Admin/Dashboard";
import StaffDashboard from "../pages/Staff/StaffDashboard";
import AddSmdPage from "../pages/AddSmd";
import AddRentPage from "../pages/AddRentPage";
import MarketerPage from "../pages/Marketers/MarketerPage";
import CustomerPage from "../pages/Customers/CustomerFormPage";
import RentPayoutPage from "../pages/Payout/RentPayoutPage";
import SmdListPage from "../pages/Smds/SmdListPage";
import MarketersListPage from "../pages/Marketers/MarketerListPage";
import CustomerListPage from "../pages/Customers/CustomerListPage";
import SmdClosedPage from "../pages/SmdClosed/SmdClosedPage";
import StaffListPage from "../pages/Staff/StaffListPage";
import PayoutPage from "../pages/Payout/PayoutPage";
import SmdClosingFormPage from "../pages/SmdClosed/SmdClosingFormPage";
import Dashboard from "../pages/Marketers/Dashboard";
import Customers from "../pages/Marketers/Customers";
import Earnings from "../pages/Marketers/Earnings";
import MarketerLayout from "../layouts/MarketerLayout";


const AppRouter = () => {


  return (
    <Routes>

      {/* ---------------- PUBLIC ROUTES ---------------- */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Landing />
          </PublicLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicLayout>
            <LoginPage />
          </PublicLayout>
        }
      />

      <Route
        path="/register"
        element={
          <PublicLayout>
            <RegisterPage />
          </PublicLayout>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <PublicLayout>
            <OTPVerificationPage />
          </PublicLayout>
        }
      />

      <Route
        path="/unauthorized"
        element={
          <PublicLayout>
            <div className="p-8 text-center text-red-600 font-semibold">
              Unauthorized Access
            </div>
          </PublicLayout>
        }
      />

      {/* ---------------- ADMIN / STAFF ROUTES ---------------- */}

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff-dashboard"
        element={
          <ProtectedRoute roles={["staff"]}>
            <AdminLayout>
              <StaffDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-smd"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <AddSmdPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-rent-record"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <AddRentPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-marketer"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <MarketerPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-customer"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <CustomerPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-rent-payout"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <RentPayoutPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/smds"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <SmdListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/marketers"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <MarketersListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers-list"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <CustomerListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/smds-sell"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <SmdClosingFormPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/closed-deals"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <SmdClosedPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminLayout>
              <StaffListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/rent-payouts"
        element={
          <ProtectedRoute roles={["admin", "staff"]}>
            <AdminLayout>
              <PayoutPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------------- FALLBACK ---------------- */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <div className="p-8 text-center">Page Not Found</div>
          </PublicLayout>
        }
      />

<Route
  path="/marketer-dashboard"
  element={
    <ProtectedRoute roles={["marketer"]}>
      <MarketerLayout>
        <Dashboard />
      </MarketerLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/marketer/customers"
  element={
    <ProtectedRoute roles={["marketer"]}>
      <MarketerLayout>
        <Customers />
      </MarketerLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/marketer/earnings"
  element={
    <ProtectedRoute roles={["marketer"]}>
      <MarketerLayout>
        <Earnings />
      </MarketerLayout>
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRouter;
