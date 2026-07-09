function SearchBar({ filters, setFilters, onSearch }) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto -mt-28">

            <div className="grid grid-cols-3 gap-6">

                <input
                    type="text"
                    placeholder="Location"
                    value={filters.city}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            city: e.target.value
                        })
                    }
                    className="bg-gray-100 rounded-xl p-4 outline-none"
                />

                <input
                    type="number"
                    placeholder="Guests"
                    value={filters.capacity}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            capacity: e.target.value
                        })
                    }
                    className="bg-gray-100 rounded-xl p-4 outline-none"
                />

                <button
                    onClick={onSearch}
                    className="bg-blue-600 text-white rounded-xl p-4 font-semibold hover:bg-blue-700 transition duration-300"
                >
                    Search Venue
                </button>

            </div>

        </div>
    );
}

export default SearchBar;