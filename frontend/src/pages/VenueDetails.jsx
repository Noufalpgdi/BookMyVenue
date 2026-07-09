import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../api/venueApi";

function VenueDetails() {

    const { id } = useParams();

    const [venue, setVenue] = useState(null);

    const loadVenue = async () => {

        try {

            const result = await getVenueById(id);

            setVenue(result.venue);

        }
        catch (error) {

            console.log(
                error.response?.data || error.message
            );

        }

    };

    useEffect(() => {

        loadVenue();

    }, []);

    if (!venue) {

        return (

            <div className="text-center mt-20 text-xl">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto p-10">

            <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
                alt={venue.name}
                className="w-full h-[500px] object-cover rounded-3xl"
            />

            <h1 className="text-5xl font-bold mt-10">
                {venue.name}
            </h1>

            <p className="text-gray-500 text-xl mt-5">
                📍 {venue.city}
            </p>

            <p className="text-xl mt-5">
                👥 Capacity : {venue.capacity}
            </p>

            <p className="mt-8 text-lg">
                {venue.description}
            </p>

        </div>

    );

}

export default VenueDetails;