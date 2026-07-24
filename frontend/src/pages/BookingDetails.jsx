import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBookingById } from "../api/bookingApi";

import BookingHero from "../components/booking-details/BookingHero";
import VenueInformation from "../components/booking-details/VenueInformation";
import BookingInformation from "../components/booking-details/BookingInformation";
import PaymentInformation from "../components/booking-details/PaymentInformation";
import BookingSummary from "../components/booking-details/BookingSummary";
import PaymentStatusCard from "../components/booking-details/PaymentStatusCard";
import NeedHelpCard from "../components/booking-details/NeedHelpCard";
import BookingActions from "../components/booking-details/BookingActions";


function BookingDetails() {
    const { id } = useParams();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Get booking ID

    // State

    // Fetch booking
    const fetchBooking = async () => {

        try {

            const result = await getBookingById(id);
            console.log(result);
            setBooking(result.booking);

        } catch (error) {

            setError("Unable to load booking.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchBooking();
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="text-center mt-10">
                Loading booking...
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="text-center mt-10 text-red-600">
                {error}
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8">

            <BookingHero booking={booking} />

            <div className="grid grid-cols-12 gap-8 mt-8">

                <div className="col-span-8">

                    <VenueInformation booking={booking} />

                    <BookingInformation booking={booking} />

                    <PaymentInformation booking={booking} />

                </div>

                <div className="col-span-4">

                    <BookingSummary booking={booking} />

                    <PaymentStatusCard booking={booking} />

                    <NeedHelpCard />

                    <BookingActions booking={booking} />

                </div>

            </div>

        </div>

    );
}

export default BookingDetails;