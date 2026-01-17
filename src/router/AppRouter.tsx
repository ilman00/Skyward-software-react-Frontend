import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import LoginPage from "../pages/Login";
import AdminDashboard from "../pages/Admin/Dashboard";
import ProtectedRoute from "../routes/ProtectedRoutes";
import AddSmdPage from "../pages/AddSmd"
import AddRentPage from "../pages/AddRentPage";
import MarketerPage from "../pages/Marketers/MarketerPage";
import CustomerPage from "../pages/Customers/CustomerFormPage";
import RentPayoutPage from "../pages/Payout/RentPayoutPage";
import StaffDashboard from "../pages/Staff/StaffDashboard";
import SmdListPage from "../pages/Smds/SmdListPage";
import MarketersListPage from "../pages/Marketers/MarketerListPage";
import CustomerListPage from "../pages/Customers/CustomerListPage";
import SmdClosedPage from "../pages/SmdClosed/SmdClosedPage";
import StaffListPage from "../pages/Staff/StaffListPage";
import PayoutPage from "../pages/Payout/PayoutPage";
import RegisterPage from "../pages/Register";


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
            <Route
                path="/admin-dashboard"
                element={
                    <ProtectedRoute roles={["admin"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-smd"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <AddSmdPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/add-rent-record"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <AddRentPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-marketer"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <MarketerPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/add-customer"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <CustomerPage />
                    </ProtectedRoute>
                }
            />


            <Route
                path="/add-rent-payout"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <RentPayoutPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/staff-dashboard"
                element={
                    <ProtectedRoute roles={["staff"]}>
                        <StaffDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/smds"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <SmdListPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/marketers"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <MarketersListPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/customers-list"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <CustomerListPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/closed-deals"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <SmdClosedPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/staff"
                element={
                    <ProtectedRoute roles={["admin"]}>
                        <StaffListPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/rent-payouts"
                element={
                    <ProtectedRoute roles={["admin", "staff"]}>
                        <PayoutPage />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
    );
};

export default AppRouter;
