import { useEffect, useState } from "react";
import getVenues from "../api/venueApi";
import VenueCard from "../components/VenueCard";
import Navbar from "../components/Navbar";

function VenueList() {

    const [venues, setVenues] = useState([]);

    const loadVenues = async () => {
        try {
            const result = await getVenues();

            setVenues(result.venues);
        }
        catch(error)
        {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        loadVenues();
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Venue List</h1>

            {
                venues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue}/>
                ))
            }

        </div>
    );
}

export default VenueList;