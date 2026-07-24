import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VenueList from "../pages/VenueList";
import VenueDetails from "../pages/VenueDetails";
import Profile from "../pages/Profile";
import MyBookings from "../pages/MyBookings";
import BookingDetails from "../pages/BookingDetails";

import OwnerDashboard from "../pages/owner/Dashboard";
import MyVenues from "../pages/owner/MyVenues";
import AddVenue from "../pages/owner/AddVenue";
import EditVenue from "../pages/owner/EditVenue";

import AdminDashboard from "../pages/admin/Dashboard";
import PendingApproval from "../pages/admin/PendingApproval";

import ProtectedRoute from "../components/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import OwnerLayout from "../layouts/OwnerLayout";
import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {

    return (

        <Routes>

            {/* ===========================
                Customer Routes
            ============================ */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/venues"
                    element={<VenueList />}
                />

                <Route
                    path="/venues/:id"
                    element={<VenueDetails />}
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookings/:id"
                    element={
                        <ProtectedRoute>
                            <BookingDetails />
                        </ProtectedRoute>
                    }
                />

            </Route>

            {/* ===========================
                Owner Routes
            ============================ */}

            <Route
                path="/owner"
                element={
                    <ProtectedRoute>
                        <OwnerLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="dashboard"
                    element={<OwnerDashboard />}
                />

                <Route
                    path="venues"
                    element={<MyVenues />}
                />

                <Route
                    path="venues/new"
                    element={<AddVenue />}
                />

                <Route
                    path="venues/edit/:id"
                    element={<EditVenue />}
                />

            </Route>

            {/* ===========================
                Admin Routes
            ============================ */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="pending-approvals"
                    element={<PendingApproval />}
                />

                {/* Future Pages */}

                {/* <Route path="venues" element={<AdminVenues />} /> */}

                {/* <Route path="users" element={<Users />} /> */}

                {/* <Route path="bookings" element={<Bookings />} /> */}

                {/* <Route path="reports" element={<Reports />} /> */}

            </Route>

            {/* ===========================
                Authentication
            ============================ */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

        </Routes>

    );

}

export default AppRoutes;