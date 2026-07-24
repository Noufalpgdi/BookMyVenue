import {
    ClipboardList,
    CalendarDays,
    Clock3,
    Timer,
    BadgeCheck
} from "lucide-react";

function BookingInformation({ booking }) {

    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    const durationInHours =
        (end - start) / (1000 * 60 * 60);

    const statusStyles = {
        PENDING: "text-yellow-600",
        CONFIRMED: "text-green-600",
        CANCELLED: "text-red-600",
    };

    const formattedStatus =
        booking.status.charAt(0) +
        booking.status.slice(1).toLowerCase();

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            {/* Header */}

            <div className="flex items-center gap-2 mb-6">

                <ClipboardList
                    size={18}
                    className="text-blue-500"
                />

                <h2 className="text-xl font-semibold">
                    Booking Information
                </h2>

            </div>

            {/* Booking Date */}

            <div className="space-y-5">

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <CalendarDays size={16} />

                        <span>Booking Date</span>

                    </div>

                    <span className="font-medium">
                        {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>

                </div>

                {/* Start Time */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <Clock3 size={16} />

                        <span>Start Time</span>

                    </div>

                    <span className="font-medium">
                        {start
                            .toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })
                            .toUpperCase()}
                    </span>

                </div>

                {/* End Time */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <Clock3 size={16} />

                        <span>End Time</span>

                    </div>

                    <span className="font-medium">
                        {end
                            .toLocaleTimeString("en-IN", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })
                            .toUpperCase()}
                    </span>

                </div>

                {/* Duration */}

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">

                    <div className="flex items-center gap-2 text-gray-500">

                        <Timer size={16} />

                        <span>Duration</span>

                    </div>

                    <span className="font-medium">
                        {durationInHours} Hour{durationInHours > 1 ? "s" : ""}
                    </span>

                </div>

                {/* Status */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 text-gray-500">

                        <BadgeCheck size={16} />

                        <span>Booking Status</span>

                    </div>

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : booking.status === "CONFIRMED"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {formattedStatus}
                    </span>

                </div>

            </div>

        </div>

    );
}

export default BookingInformation;