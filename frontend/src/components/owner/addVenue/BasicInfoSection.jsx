import { Building2 } from "lucide-react";

function BasicInfoSection({
    formData,
    setFormData,
    venueTypes,
    loadingVenueTypes
}) {

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

                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">

                    <Building2
                        size={20}
                        className="text-blue-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Basic Information
                    </h2>

                    <p className="text-sm text-gray-500">
                        Enter the basic details of your venue.
                    </p>

                </div>

            </div>

            {/* Form */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Venue Name */}

                <div>

                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Venue Name *
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        autoComplete="off"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter venue name"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Venue Type */}

                <div>

                    <label
                        htmlFor="venueType"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Venue Type *
                    </label>

                    <select
                        id="venueType"
                        name="venueType"
                        required
                        value={formData.venueType}
                        onChange={handleChange}
                        disabled={loadingVenueTypes}
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition appearance-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >

                        <option value="">
                            {loadingVenueTypes
                                ? "Loading venue types..."
                                : "Select Venue Type"}
                        </option>

                        {venueTypes.map(type => (

                            <option
                                key={type}
                                value={type}
                            >
                                {type
                                    .replace(/_/g, " ")
                                    .toLowerCase()
                                    .replace(/\b\w/g, letter => letter.toUpperCase())}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

            {/* Description */}

            <div className="mt-6">

                <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-700"
                >
                    Description *
                </label>

                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your venue..."
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />

            </div>

        </div>

    );

}

export default BasicInfoSection;