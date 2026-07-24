import {
    MapPin,
    CalendarDays,
    Clock3,
    Hash
} from "lucide-react";

function BookingHero({ booking }) {

    const statusStyles = {
        PENDING: "bg-yellow-100 text-yellow-700",
        CONFIRMED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    };

    const formattedStatus =
        booking.status.charAt(0).toUpperCase() +
        booking.status.slice(1).toLowerCase();

    return (

        <div className="bg-white rounded-xl shadow p-5">

            <div className="grid grid-cols-12 gap-8">

                {/* Venue Image */}
                <div className="col-span-4">

                    <img
                        src={booking.venue.imageUrl}
                        alt={booking.venue.name}
                        className="w-full h-48 object-cover rounded-lg"
                    />

                </div>

                {/* Booking Details */}
                <div className="col-span-8 flex flex-col justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">
                            {booking.venue.name}
                        </h1>

                        <div className="flex items-center gap-2 mt-3 text-gray-500">

                            <MapPin
                                size={18}
                                className="text-pink-500"
                            />

                            <span>
                                {booking.venue.city}
                            </span>

                        </div>

                    </div>

                    <div className="flex gap-10 mt-7">

                        <div className="flex items-start gap-3">

                            <CalendarDays
                                size={18}
                                className="text-blue-500 mt-1"
                            />

                            <div>

                                <p className="font-medium">
                                    {new Date(booking.startTime).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Date
                                </p>

                            </div>

                        </div>

                        <div className="flex items-start gap-3">

                            <Clock3
                                size={18}
                                className="text-blue-500 mt-1"
                            />

                            <div>

                                <p className="font-medium">

                                    {new Date(booking.startTime)
                                        .toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                        .toUpperCase()}

                                    {" - "}

                                    {new Date(booking.endTime)
                                        .toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })
                                        .toUpperCase()}

                                </p>

                                <p className="text-sm text-gray-500">
                                    Time
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="flex items-center gap-6 mt-6">

                        <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                statusStyles[booking.status]
                            }`}
                        >
                            {formattedStatus}
                        </span>

                        <div className="flex items-center gap-2 text-gray-500">

                            <Hash size={16} />

                            <span>
                                Booking ID: BK-{booking.id}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default BookingHero;