import {
    Building2,
    MapPin,
    Hash,
    User,
    Mail
} from "lucide-react";

function VenueInformation({ booking }) {
    return (
        <div className="bg-white rounded-xl shadow p-6 mb-6">

            {/* Header */}
            <div className="flex items-center gap-2 mb-6">

                <Building2
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-xl font-semibold">
                    Venue Information
                </h2>

            </div>

            {/* Information */}
            <div className="space-y-5">

                {/* Venue Name */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">
                        <Building2 size={16} />
                        <span>Venue Name</span>
                    </div>

                    <span className="font-medium">
                        {booking.venue.name}
                    </span>

                </div>

                {/* Location */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={16} />
                        <span>Location</span>
                    </div>

                    <span className="font-medium">
                        {[
                            booking.venue.address,
                            booking.venue.district,
                            booking.venue.state,
                        ]
                            .filter(Boolean)
                            .join(", ")}
                    </span>

                </div>

                {/* Venue ID */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">
                        <Hash size={16} />
                        <span>Venue ID</span>
                    </div>

                    <span className="font-medium">
                        #{booking.venue.id}
                    </span>

                </div>

                {/* Booked By */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">
                        <User size={16} />
                        <span>Booked By</span>
                    </div>

                    <span className="font-medium">
                        {booking.user.name}
                    </span>

                </div>

                {/* Email */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-500">
                        <Mail size={16} />
                        <span>Email</span>
                    </div>

                    <span className="font-medium">
                        {booking.user.email}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default VenueInformation;