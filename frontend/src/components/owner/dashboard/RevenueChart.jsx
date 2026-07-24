import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const revenueData = [
    { month: "Jan", revenue: 18000 },
    { month: "Feb", revenue: 22000 },
    { month: "Mar", revenue: 28000 },
    { month: "Apr", revenue: 26000 },
    { month: "May", revenue: 34000 },
    { month: "Jun", revenue: 42000 },
];

function RevenueChart() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-800">
                    Revenue Overview
                </h3>

                <p className="text-sm text-gray-500">
                    Monthly revenue
                </p>

            </div>

            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={revenueData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563eb"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default RevenueChart;