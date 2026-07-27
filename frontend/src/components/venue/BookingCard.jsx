import { useState } from "react";
import { createBooking } from "../../api/bookingApi";
import {createPaymentOrder,verifyPayment} from "../../api/paymentApi";
import loadRazorpay from "../../utils/loadRazorpay";
import { useNavigate,useLocation  } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function BookingCard({ venue }) {
    const [bookingDate, setBookingDate] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const today = new Date();

    const minDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];
    
    const calculateEstimatedPrice = () => {

        const pricePerHour = Number(venue.pricePerHour);

        if (!startTime || !endTime) {
            return pricePerHour;
        }

        const start = new Date(`2000-01-01T${startTime}:00`);
        const end = new Date(`2000-01-01T${endTime}:00`);

        const hours = (end - start) / (1000 * 60 * 60);

        if (hours <= 0) {
            return pricePerHour;
        }

        return hours * pricePerHour;
    };

    const openRazorpay = (order, bookingId) => {
        const options = {

            key: order.key,

            amount: order.amount,

            currency: order.currency,

            order_id: order.orderId,

            name: "BookMyVenue",

            description: `Booking for ${venue.name}`,

            theme: {
                color: "#2563EB"
            },

            // Add retry here
            retry: {
                enabled: true,
                max_count: 2
            },

            notes: {
                bookingId: bookingId,
                venueId: venue.id
            },

            handler: async function (response) {

                try 
                {

                    const verifyResponse = await verifyPayment({

                        bookingId,

                        razorpay_payment_id: response.razorpay_payment_id,

                        razorpay_order_id: response.razorpay_order_id,

                        razorpay_signature: response.razorpay_signature

                    });

                    console.log("Payment verified", verifyResponse);

                    if (verifyResponse.success) {

                        toast.success("Payment completed successfully.");

                        setBookingDate(null);
                        setStartTime("");
                        setEndTime("");

                        setTimeout(() => {
                            navigate("/my-bookings");
                        }, 1000);

                    }

                } 
                catch (error) 
                {

                    console.error(error);

                    toast.error( error.response?.data?.message || "Payment verification failed.");

                }

            },
            modal: {

                ondismiss: function () {
                    
                    console.log("Payment cancelled");

                    toast.info("Payment cancelled");

                }

            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();
    };

    const handleBooking = async () => {

        if (loading) return;

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login", {
                state: {
                    from: location.pathname
                }
            });
            return;
        }

        if (!bookingDate || !startTime || !endTime) {

            //alert("Please select booking date, start time and end time.");

            toast.error("Please select booking date, start time and end time");

            return;
        }

        const bookingDateString = bookingDate.toISOString().split("T")[0];

        const startDateTime = new Date(
            `${bookingDateString}T${startTime}:00`
        );

        const endDateTime = new Date(
            `${bookingDateString}T${endTime}:00`
        );

        if (startDateTime >= endDateTime) {

            //alert("End time must be after start time.");

            toast.error("End time must be after start time.");

            return;
        }

        const bookingData = {
            venueId: venue.id,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString()
        };

        try {

            setLoading(true);

            const bookingResponse = await createBooking(bookingData);

            const bookingId = bookingResponse.booking.id;

            // NEW
            const razorpayLoaded = await loadRazorpay();

            if (!razorpayLoaded) {

                //alert("Failed to load Razorpay.");

                toast.error("Failed to load Razorpay.");

                return;
            }

            const order = await createPaymentOrder(bookingId);

            openRazorpay(order, bookingId);

        } catch (error) {

            console.error(error);

            //alert(error.response?.data?.message || "Booking failed.");

            toast.error(error.response?.data?.message || "Booking failed.");
            

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="border rounded-xl p-6 shadow-md bg-white sticky top-24">

            {/* Price */}
            <h3 className="text-lg text-gray-600">
                Starting from
            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
                ₹{venue.pricePerHour}
                <span className="text-lg text-gray-500 font-normal">
                    /hour
                </span>
            </p>

            {/* Date */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                </label>

                <DatePicker
                    selected={bookingDate}
                    onChange={(date) => setBookingDate(date)}
                    placeholderText="Please select a date"
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    wrapperClassName="w-full"
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Start Time */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                </label>

                <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Start Time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                </select>
            </div>

            {/* End Time */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                </label>

                <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select End Time</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="18:00">06:00 PM</option>
                </select>
            </div>

            {/* Estimated Price */}
            <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                        Estimated Price
                    </span>

                    <span className="text-xl font-bold text-blue-600">
                        ₹{calculateEstimatedPrice().toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                    *Final amount will be calculated based on booking duration.
                </p>
            </div>

            {/* Book Button */}
            <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
                {loading ? "Booking..." : "Book Now"}
            </button>

        </div>
    );
}

export default BookingCard;