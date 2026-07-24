import "./Dashboard.css";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

function VenueStatusChart() {

    const venueStatusData = [
        {
            name: "Approved",
            value: 298
        },
        {
            name: "Pending",
            value: 18
        },
        {
            name: "Rejected",
            value: 26
        }
    ];

    const COLORS = [
        "#22C55E",
        "#F59E0B",
        "#EF4444"
    ];

    return (

        <div className="dashboard-card">

            <h2>Venue Approval Summary</h2>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie
                        data={venueStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {
                            venueStatusData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))
                        }
                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default VenueStatusChart;