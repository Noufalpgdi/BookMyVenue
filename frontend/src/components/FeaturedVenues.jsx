import { useState, useEffect } from "react";
import getVenues from "../api/venueApi";
import VenueCard from "./VenueCard";

function FeaturedVenues({ filters }) {

    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadVenues = async () => {
        setLoading(true);
        try {

            const result = await getVenues(filters);

            setVenues(result.venues);

        }
        catch (error) {

            console.log(
                error.response?.data || error.message
            );

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        loadVenues();
    }, [filters]);

    if (loading) {

        return (
            <section className="max-w-7xl mx-auto py-20 px-8">
                <h2 className="text-4xl font-bold text-center mb-10">
                    Featured Venues
                </h2>

                <p className="text-center text-gray-500">
                    Loading venues...
                </p>
            </section>
        );

    }

    if (venues.length === 0) {

        return (
            <section className="max-w-7xl mx-auto py-20 px-8">

                <h2 className="text-4xl font-bold text-center mb-10">
                    Featured Venues
                </h2>

                <p className="text-center text-gray-500">
                    No venues available.
                </p>

            </section>
        );

    }

    return (

        <section className="max-w-7xl mx-auto py-20 px-8">

            <h2 className="text-4xl font-bold text-center mb-10">
                Featured Venues
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    venues.slice(0, 6).map((venue) => (

                        <VenueCard
                            key={venue.id}
                            venue={venue}
                        />

                    ))
                }

            </div>

            <div className="flex justify-center mt-12">

                <button
                    className="
                        bg-blue-600
                        text-white
                        px-8
                        py-4
                        rounded-xl
                        hover:bg-blue-700
                        transition
                        duration-300
                    "
                >
                    View All Venues
                </button>

            </div>

        </section>

    );
}

export default FeaturedVenues;