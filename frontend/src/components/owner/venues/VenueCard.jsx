import { MapPin, Star, Pencil, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";



function VenueCard({ venue }) {

    const navigate = useNavigate();
    
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">

            {/* Venue Image */}

            <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-52 object-cover"
            />

            {/* Content */}

            <div className="p-5">

                <h3 className="text-xl font-semibold text-gray-800">
                    {venue.name}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 mt-2">

                    <MapPin size={16} />

                    <span>{venue.city}</span>

                </div>

                <div className="flex items-center justify-between mt-4">

                    <p className="text-blue-600 font-bold text-lg">
                        ₹{Number(venue.pricePerHour).toLocaleString("en-IN")}
                        <span className="text-sm font-normal text-gray-500">
                            {" "} / hour
                        </span>
                    </p>

                    <div className="flex items-center gap-1 text-yellow-500">

                        <Star size={16} fill="currentColor" />

                        <span className="font-medium text-gray-700">
                            {venue.rating}
                        </span>

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex gap-3 mt-6">

                    <button onClick={() => navigate(`/owner/venues/edit/${venue.id}`)} className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 py-2.5 rounded-xl hover:bg-blue-50 transition">

                        <Pencil size={18} />

                        Edit

                    </button>

                    <button className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 py-2.5 rounded-xl hover:bg-red-50 transition">

                        <Trash2 size={18} />

                        Delete

                    </button>

                </div>

            </div>

        </div>
    );
}

export default VenueCard;