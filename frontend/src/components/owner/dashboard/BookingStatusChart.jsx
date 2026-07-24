import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const data = [
    { name: "Confirmed", value: 65 },
    { name: "Pending", value: 20 },
    { name: "Cancelled", value: 15 },
];

const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
];

function BookingStatusChart() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

            <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-800">
                    Booking Status
                </h3>

                <p className="text-sm text-gray-500">
                    Overall bookings
                </p>

            </div>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={95}
                    >

                        {data.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

        </div>
    );
}

export default BookingStatusChart;