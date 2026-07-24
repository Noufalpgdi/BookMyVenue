import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, MapPin, CalendarDays, Clock3, Users } from "lucide-react";
import { cancelBooking } from "../../api/bookingApi";

function BookingCard({booking}) {
    const statusStyles = {
        PENDING: "bg-yellow-100 text-yellow-700",
        CONFIRMED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    };
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const durationInHours = (end - start) / (1000 * 60 * 60);

    const pricePerHour = Number(booking.totalAmount) / durationInHours;

    const navigate = useNavigate();

    const formattedStatus =
    booking.status.charAt(0).toUpperCase() +
    booking.status.slice(1).toLowerCase();

    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancelBooking = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) return;

        try {

            setIsCancelling(true);

            await cancelBooking(booking.id);


            alert("Booking cancelled successfully.");

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to cancel booking."
            );

        }
        finally
        {

            setIsCancelling(false);

        }

    };

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-6">

            <div className="grid grid-cols-12 gap-6">

                {/* Image */}
                <div className="col-span-3">
                    <img
                        src={booking.venue.imageUrl}
                        alt={booking.venue.name}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                </div>

                {/* Venue Details */}
                <div className="col-span-6">

                    <div className="space-y-6">

                        <div>

                            <h2 className="text-2xl font-bold">
                                {booking.venue.name}
                            </h2>

                            <div className="flex items-center gap-2 mt-2 text-gray-500">
                                <MapPin size={16} className="text-pink-500" />
                                <span>{booking.venue.city}</span>
                            </div>

                        </div>

                        <div className="flex gap-12">

                                <div className="flex gap-3">

                                    <CalendarDays
                                        size={20}
                                        className="text-blue-600 mt-0.5"
                                    />

                                    <div>
                                        <p className="font-semibold">
                                            {new Date(booking.startTime).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Date
                                        </p>
                                    </div>

                                </div>

                                
                                <div className="flex gap-3">

                                    <Clock3
                                        size={22}
                                        className="text-blue-600 mt-0.5"
                                    />

                                    <div>

                                        <p className="font-semibold">
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

                                        <p className="text-gray-500 text-sm">
                                            Time
                                        </p>

                                    </div>

                                </div>
                                
                                <div className="flex gap-3">

                                    <Users
                                        size={22}
                                        className="text-blue-600 mt-0.5"
                                    />

                                    <div>

                                        <p className="font-semibold">
                                            {Number(booking.venue.capacity).toLocaleString("en-IN")} People
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Venue Capacity
                                        </p>

                                    </div>

                                </div>

                        </div>

                    </div>

                </div>

                {/* Price & Actions */}
                <div className="col-span-3 flex flex-col items-end">

                    {/* Status */}
                    <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                            statusStyles[booking.status] || "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {formattedStatus}
                    </span>

                    {/* Price */}
                    <div className="mt-6 text-right">

                        <h2 className="text-3xl font-bold">
                            ₹{Number(booking.totalAmount).toLocaleString("en-IN")}
                        </h2>

                        <p className="text-gray-500 mt-0.5">
                            ₹{pricePerHour.toLocaleString("en-IN")}/hour × {durationInHours} hour{durationInHours > 1 ? "s" : ""}
                        </p>

                    </div>

                    <div className="mt-6 flex justify-end gap-3">

                        <button
                            onClick={() => navigate(`/bookings/${booking.id}`)}
                            className="w-44 h-10 flex items-center justify-center gap-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                        >
                            <Eye size={16} strokeWidth={2.5} />
                            <span>View Details</span>
                        </button>

                        {booking.status === "PENDING" && (
                            <button
                                onClick={handleCancelBooking}
                                disabled={isCancelling}
                                className="w-44 h-10 flex items-center justify-center gap-2 border border-red-500 rounded-lg text-red-500 text-sm font-medium hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Trash2 size={16} strokeWidth={2.5} />
                                <span>
                                    {isCancelling ? "Cancelling..." : "Cancel Booking"}
                                </span>
                            </button>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BookingCard;