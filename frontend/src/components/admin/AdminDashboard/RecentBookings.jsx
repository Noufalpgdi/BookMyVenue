import "./Dashboard.css";

function RecentBookings() {

    const recentBookings = [
        {
            id: 1,
            customer: "Arun Kumar",
            venue: "Grand Palace",
            date: "15 Jul 2026",
            amount: "₹25,000"
        },
        {
            id: 2,
            customer: "Rahul Das",
            venue: "Royal Garden",
            date: "18 Jul 2026",
            amount: "₹18,500"
        },
        {
            id: 3,
            customer: "Nikhil Joseph",
            venue: "Beach Resort",
            date: "20 Jul 2026",
            amount: "₹32,000"
        },
        {
            id: 4,
            customer: "Anand Nair",
            venue: "Sky Convention",
            date: "22 Jul 2026",
            amount: "₹40,000"
        }
    ];

    return (
        <div className="dashboard-card">

            <div className="table-header">
                <h2>Recent Bookings</h2>

                <button className="view-all-btn">
                    View All
                </button>
            </div>

            <table className="dashboard-table">

                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Venue</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>

                    {recentBookings.map((booking) => (

                        <tr key={booking.id}>

                            <td>{booking.customer}</td>

                            <td>{booking.venue}</td>

                            <td>{booking.date}</td>

                            <td>{booking.amount}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );

}

export default RecentBookings;