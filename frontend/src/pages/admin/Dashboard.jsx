import "../../components/admin/AdminDashboard/Dashboard.css";

import StatCard from "../../components/admin/AdminDashboard/StatCard";
import DashboardCharts from "../../components/admin/AdminDashboard/DashboardCharts";
import VenueStatusChart from "../../components/admin/AdminDashboard/VenueStatusChart";
import RecentPendingVenues from "../../components/admin/AdminDashboard/RecentPendingVenues";
import RecentBookings from "../../components/admin/AdminDashboard/RecentBookings";

import { useEffect, useState } from "react";

import { getAllPendingApprovalVenues } from "../../api/venueApi";

import {
    Users,
    UserCheck,
    Building2,
    CalendarCheck
} from "lucide-react";

function Dashboard() {

    const [pendingVenues, setPendingVenues] = useState([]);

    // Dummy data (Replace with API response later)
    const dashboardData = {
        totalUsers: 1248,
        totalOwners: 156,
        totalVenues: 342,
        totalBookings: 586,

        // Used by Venue Status Pie Chart
        pendingVenues: 18,
        approvedVenues: 298,
        rejectedVenues: 26
    };

    const loadPendingVenues = async () => {

        try {

            const response = await getAllPendingApprovalVenues();

            // Show only first 5 on dashboard
            setPendingVenues(response.venues.slice(0, 5));

        }
        catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadPendingVenues();

    }, []);

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1>Admin Dashboard</h1>

                <p>
                    Welcome back! Here's what's happening today.
                </p>

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                <StatCard
                    title="Total Users"
                    value={dashboardData.totalUsers}
                    subtitle="Registered users"
                    icon={<Users size={26} />}
                    color="#3B82F6"
                />

                <StatCard
                    title="Venue Owners"
                    value={dashboardData.totalOwners}
                    subtitle="Active owners"
                    icon={<UserCheck size={26} />}
                    color="#10B981"
                />

                <StatCard
                    title="Total Venues"
                    value={dashboardData.totalVenues}
                    subtitle="Listed venues"
                    icon={<Building2 size={26} />}
                    color="#8B5CF6"
                />

                <StatCard
                    title="Total Bookings"
                    value={dashboardData.totalBookings}
                    subtitle="Completed & Upcoming"
                    icon={<CalendarCheck size={26} />}
                    color="#06B6D4"
                />

            </div>

            {/* Charts */}

            <div className="chart-grid">

                <DashboardCharts />

                <VenueStatusChart
                    pending={dashboardData.pendingVenues}
                    approved={dashboardData.approvedVenues}
                    rejected={dashboardData.rejectedVenues}
                />

            </div>

            {/* Tables */}

            <div className="table-grid">

                <RecentPendingVenues
                    venues={pendingVenues}
                />

                <RecentBookings />

            </div>

        </div>

    );

}

export default Dashboard;