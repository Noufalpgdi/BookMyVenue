import { MapPinned } from "lucide-react";

function LocationSection({ formData, setFormData }) {

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-8">

                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">

                    <MapPinned
                        size={20}
                        className="text-green-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Location
                    </h2>

                    <p className="text-sm text-gray-500">
                        Provide the venue address and location details.
                    </p>

                </div>

            </div>

            {/* Address */}

            <div>

                <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Address *
                </label>

                <input
                    id="address"
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter venue address"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* City + District */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <div>

                    <label
                        htmlFor="city"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        City *
                    </label>

                    <input
                        id="city"
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div>

                    <label
                        htmlFor="district"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        District *
                    </label>

                    <input
                        id="district"
                        type="text"
                        name="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        placeholder="Enter district"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

            {/* State */}

            <div className="mt-6">

                <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    State *
                </label>

                <input
                    id="state"
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />

            </div>

            {/* Latitude + Longitude */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                <div>

                    <label
                        htmlFor="latitude"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Latitude
                    </label>

                    <input
                        id="latitude"
                        type="number"
                        step="any"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div>

                    <label
                        htmlFor="longitude"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Longitude
                    </label>

                    <input
                        id="longitude"
                        type="number"
                        step="any"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        placeholder="Optional"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

        </div>

    );

}

export default LocationSection;