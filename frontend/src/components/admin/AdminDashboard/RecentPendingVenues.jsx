import "./Dashboard.css";

import { useNavigate } from "react-router-dom";


function RecentPendingVenues({ venues = [] }) {

    const navigate = useNavigate();

    return (

        <div className="dashboard-card">

            <div className="table-header">

                <h2>Recent Pending Venues</h2>

                <button
                    className="view-all-btn"
                    onClick={() => navigate("/admin/pending-approvals")}
                >
                    View All
                </button>

            </div>

            <table className="dashboard-table">

                <thead>

                    <tr>

                        <th>Venue</th>

                        <th>Owner</th>

                        <th>City</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        venues.length > 0 ? (

                            venues.map((venue) => (

                                <tr key={venue.id}>

                                    <td>{venue.name}</td>

                                    <td>{venue.owner?.name}</td>

                                    <td>{venue.city}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="3"
                                    className="text-center py-4"
                                >
                                    No pending venues found.
                                </td>

                            </tr>

                        )
                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentPendingVenues;