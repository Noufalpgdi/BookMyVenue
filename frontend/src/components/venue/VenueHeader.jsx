import { MapPin } from "lucide-react";

function VenueHeader({ venue }) {
    return (
        <div className="mt-8 space-y-3">

            <h1 className="text-3xl font-bold text-gray-900">
                {venue.name}
            </h1>

            <div className="flex items-center gap-2 text-gray-600">

                <MapPin className="w-5 h-5 text-gray-500" />

                <span>
                    {venue.address}, {venue.city}, {venue.state}
                </span>

            </div>

        </div>
    );
}

export default VenueHeader;