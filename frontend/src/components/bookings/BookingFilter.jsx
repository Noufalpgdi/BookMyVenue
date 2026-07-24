function BookingFilter() {
    return (
        <select className="border rounded-lg px-4 py-2">
            <option value="ALL">All Bookings</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="CANCELLED">Cancelled</option>
        </select>
    );
}

export default BookingFilter;