import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VenueList from "../pages/VenueList";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import VenueDetails from "../pages/VenueDetails";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/venues" element={<VenueList />}/>

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/venues/:id"
                element={<VenueDetails />}
            />

        </Routes>
    );
}

export default AppRoutes;