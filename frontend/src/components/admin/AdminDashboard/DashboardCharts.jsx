import "./Dashboard.css";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function DashboardCharts() {

    const bookingData = [
        { month: "Jan", bookings: 65 },
        { month: "Feb", bookings: 78 },
        { month: "Mar", bookings: 90 },
        { month: "Apr", bookings: 81 },
        { month: "May", bookings: 120 },
        { month: "Jun", bookings: 145 },
        { month: "Jul", bookings: 170 }
    ];

    return (
        <div className="dashboard-card">

            <h2>Booking Overview</h2>

            <ResponsiveContainer width="100%" height={320}>

                <LineChart data={bookingData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#3B82F6"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );

}

export default DashboardCharts;