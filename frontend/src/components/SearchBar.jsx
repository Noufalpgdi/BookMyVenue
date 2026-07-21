import { formatVenueType } from "../utils/formatters";
function SearchBar({ filters, setFilters, filterOptions, onSearch }) {
    
    return (
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto -mt-28">

            <div className="grid grid-cols-6 gap-4">
                <input
                    type="text"
                    placeholder="Venue Name"
                    value={filters.name}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            name: e.target.value
                        })
                    }
                    className="bg-gray-100 rounded-xl p-4 outline-none"
                />
                <select
                    value={filters.state}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            state: e.target.value
                        })
                    }
                    className="bg-gray-100 rounded-xl p-4 outline-none"
                >
                    <option value="">
                        All States
                    </option>
                    {
                        filterOptions.states.map((state) => (
                            <option
                                key={state}
                                value={state}
                            >
                                {state}
                            </option>
                        ))
                    }
                </select>
                <input
                    type="text"
                    placeholder="City"
                    value={filters.city}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            city: e.target.value
                        })
                    }
                    className="bg-gray-100 rounded-xl p-4 outline-none"
                />
                <select
                    value={filters.venueType}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            venueType: e.target.value
                        })
                    }
                    className="bg-gray-100 rounded-xl p-4 outline-none"
                >
                    <option value="">
                        All Types
                    </option>
                    {
                        filterOptions.venueTypes.map((venueType) => (
                            <option
                                key={venueType}
                                value={venueType}
                            >
                                {formatVenueType(venueType)}
                            </option>
                        ))
                    }
                </select>

                <input
                    type="number"
                    placeholder="Minimum Capacity"
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