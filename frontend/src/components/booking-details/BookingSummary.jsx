import { ReceiptText } from "lucide-react";

function BookingSummary({ booking }) {

    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    const durationInHours = (end - start) / (1000 * 60 * 60);

    const pricePerHour = Number(booking.totalAmount) / durationInHours;

    const paymentStatusStyles = {
        PENDING: "text-yellow-600",
        SUCCESS: "text-green-600",
        FAILED: "text-red-600",
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">

            {/* Header */}
            <div className="flex items-center gap-2 mb-6">

                <ReceiptText
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-xl font-semibold">
                    Booking Summary
                </h2>

            </div>

            {/* Summary */}
            <div className="space-y-5">

                <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                        Total Amount
                    </span>

                    <span className="font-semibold text-lg">
                        ₹{Number(booking.totalAmount).toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                        Price / Hour
                    </span>

                    <span className="font-semibold">
                        ₹{pricePerHour.toLocaleString("en-IN")}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                        Duration
                    </span>

                    <span className="font-semibold">
                        {durationInHours} Hour{durationInHours > 1 ? "s" : ""}
                    </span>
                </div>

                <div className="border-t border-gray-200"></div>

                <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                        Payment Status
                    </span>

                    <span
                        className={`font-semibold ${
                            paymentStatusStyles[booking.payment.status] || "text-gray-600"
                        }`}
                    >
                        {booking.payment.status}
                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span className="text-gray-500">
                        Booking Created
                    </span>

                    <span className="font-semibold">
                        {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default BookingSummary;