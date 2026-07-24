import { useEffect, useState } from "react";
import { getMyBookings } from "../api/bookingApi";
import BookingHeader from "../components/bookings/BookingHeader";
import BookingFilter from "../components/bookings/BookingFilter";
import BookingList from "../components/bookings/BookingList";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = async () => {
        try {
            const result = await getMyBookings();
            console.log("API Response:", result);
            setBookings(result.bookings);
        } catch (error) {
            setError("Unable to load bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading bookings...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-600">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-8">

            <div className="flex justify-between items-start">

                <BookingHeader />

                <BookingFilter />

            </div>

            <BookingList bookings={bookings} />

        </div>
    );
}

export default MyBookings;