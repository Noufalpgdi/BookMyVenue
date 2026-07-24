import { useEffect, useState } from "react";

import { Plus } from "lucide-react";

import { getMyVenues } from "../../api/venueApi";

import { Link } from "react-router-dom";

import VenueGrid from "../../components/owner/venues/VenueGrid";

function MyVenues() {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadVenues();
    }, []);

    const loadVenues = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMyVenues();

            setVenues(response.venues || []);

        } catch (error) {
            console.error(error);
            setError("Failed to load venues.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {

        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">
                    Loading venues...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-red-600">{error}</p>

                <button
                    onClick={loadVenues}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Search + Add Venue */}

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    <input
                        type="text"
                        placeholder="Search venues..."
                        className="w-full md:max-w-md px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <Link
                        to="/owner/venues/new"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                        <Plus size={18} />
                        <span>Add Venue</span>
                    </Link>

                </div>

            </div>

            {/* Venue Grid */}

            <VenueGrid venues={venues} />

        </div>
    );
}

export default MyVenues;