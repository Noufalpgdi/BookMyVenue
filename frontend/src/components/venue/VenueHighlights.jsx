import { Users, Building2, IndianRupee, MapPinned } from "lucide-react";

function formatVenueType(type) {
    if (!type) return "";

    return type
        .toLowerCase()
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function HighlightCard({ icon, title, value }) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white min-h-[90px]">

            <div className="text-blue-600 flex-shrink-0">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-sm text-gray-500">
                    {title}
                </p>

                <p className="font-semibold text-gray-900 break-words">
                    {value}
                </p>

            </div>

        </div>
    );
}

function VenueHighlights({ venue }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

            <HighlightCard
                icon={<Users size={24} />}
                title="Capacity"
                value={`${venue.capacity} Guests`}
            />

            <HighlightCard
                icon={<Building2 size={24} />}
                title="Venue Type"
                value={formatVenueType(venue.venueType)}
            />

            <HighlightCard
                icon={<IndianRupee size={24} />}
                title="Price"
                value={`₹${venue.pricePerHour}/hour`}
            />

            <HighlightCard
                icon={<MapPinned size={24} />}
                title="District"
                value={venue.district}
            />

        </div>
    );
}

export default VenueHighlights;