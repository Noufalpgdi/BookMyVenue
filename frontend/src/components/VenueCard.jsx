import { Link } from "react-router-dom";

function VenueCard({ venue }) {

    const coverImage =
        venue.images?.[0]?.imageUrl ||
        "https://via.placeholder.com/600x400?text=No+Image";

    return (
        <div
            className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition
                duration-300
            "
        >

            <img
                src={coverImage}
                alt={venue.name}
                className="h-60 w-full object-cover"
            />

            <div className="p-6">

                <h3 className="text-2xl font-bold mb-3">
                    {venue.name}
                </h3>

                <div className="space-y-2 text-gray-500">

                    <p>
                        📍 {venue.city}
                    </p>

                    <p>
                        👥 Capacity : {venue.capacity}
                    </p>

                    <p className="text-lg font-semibold text-blue-600">
                        ₹ {venue.pricePerHour} / Hour
                    </p>

                </div>

                <Link
                    to={`/venues/${venue.id}`}
                    className="
                        mt-6
                        block
                        text-center
                        bg-blue-600
                        text-white
                        rounded-xl
                        py-3
                        font-semibold
                        hover:bg-blue-700
                        transition
                    "
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}

export default VenueCard;