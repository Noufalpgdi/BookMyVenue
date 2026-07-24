import VenueCard from "./VenueCard";
import EmptyVenue from "./EmptyVenue";



function VenueGrid({ venues }) {

    if (venues.length === 0) {
        return <EmptyVenue />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {venues.map((venue) => (
                <VenueCard
                    key={venue.id}
                    venue={venue}
                />
            ))}

        </div>
    );
}


export default VenueGrid;