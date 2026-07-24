import {Trash2,ArrowLeft,ClipboardList} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cancelBooking } from "../../api/bookingApi";

function BookingActions({ booking }) {

    const navigate = useNavigate();

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

            navigate("/my-bookings");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to cancel booking."
            );

        } finally {

            setIsCancelling(false);

        }

    };

    return (

        <div className="bg-white rounded-xl shadow p-6">

            {/* Header */}

            <div className="flex items-center gap-2 mb-5">

                <ClipboardList
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-lg font-semibold">
                    Booking Actions
                </h2>

            </div>

            <div className="border-t border-gray-100 mb-5"></div>

            <div className="space-y-3">

                {/* Back Button */}

                <button
                    onClick={() => navigate("/my-bookings")}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
                >
                    <ArrowLeft size={18} />
                    Back to My Bookings
                </button>

                {/* Cancel Booking */}

                {booking.status === "PENDING" && (

                    <button
                        onClick={handleCancelBooking}
                        disabled={isCancelling}
                        className="w-full flex items-center justify-center gap-2 border border-red-500 rounded-lg py-2.5 text-red-500 font-medium hover:bg-red-50 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    >
                        <Trash2 size={18} />

                        <span>
                            {isCancelling ? "Cancelling..." : "Cancel Booking"}
                        </span>
                    </button>

                )}

            </div>

        </div>

    );
}

export default BookingActions;