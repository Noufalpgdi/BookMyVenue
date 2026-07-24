import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueById } from "../api/venueApi";

import Amenities from "../components/venue/Amenities";
import BookingCard from "../components/venue/BookingCard";
import PerfectFor from "../components/venue/PerfectFor";
import Reviews from "../components/venue/Reviews";
import VenueGallery from "../components/venue/VenueGallery";
import VenueHeader from "../components/venue/VenueHeader";
import VenueHighlights from "../components/venue/VenueHighlights";

function VenueDetails() {
    const { id } = useParams();

    const [venue, setVenue] = useState(null);
    const [error, setError] = useState("");

    const fetchVenue = async () => {
        try {
            const result = await getVenueById(id);
            setVenue(result.venue);
        } catch (error) {
            setError("Unable to load venue.");
        }
    };

    useEffect(() => {
        fetchVenue();
    }, [id]);

    if (error) {
        return (
            <div className="text-center mt-20 text-red-600 text-xl">
                {error}
            </div>
        );
    }

    if (!venue) {
        return (
            <div className="text-center mt-20 text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            {/* Venue Gallery */}
            <VenueGallery venue={venue} />

            {/* Header + Booking */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                {/* Left Section */}
                <div className="lg:col-span-2">

                    <VenueHeader venue={venue} />

                    <VenueHighlights venue={venue} />

                    <Amenities venue={venue} />


                    {/* <PerfectFor venue={venue} /> */}
                    

                </div>

                {/* Right Section */}
                <div>
                    <BookingCard venue={venue} />
                </div>

            </div>

            {/* <Reviews venue={venue} /> */}
            

        </div>
    );
}

export default VenueDetails;