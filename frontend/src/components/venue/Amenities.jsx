function Amenities({ venue }) {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">
                Amenities
            </h2>

            <div className="flex flex-wrap gap-3">
                {venue.amenities?.map((amenity) => (
                    <span
                        key={amenity}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full"
                    >
                        {amenity}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Amenities;