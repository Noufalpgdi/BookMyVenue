import { IndianRupee } from "lucide-react";

function PricingSection({ formData, setFormData }) {

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

                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">

                    <IndianRupee
                        size={20}
                        className="text-yellow-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Pricing & Capacity
                    </h2>

                    <p className="text-sm text-gray-500">
                        Set your venue capacity and hourly pricing.
                    </p>

                </div>

            </div>

            {/* Form */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Capacity */}

                <div>

                    <label
                        htmlFor="capacity"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Capacity *
                    </label>

                    <input
                        id="capacity"
                        type="number"
                        min="1"
                        name="capacity"
                        required
                        value={formData.capacity}
                        onChange={handleChange}
                        placeholder="Enter maximum capacity"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Price */}

                <div>

                    <label
                        htmlFor="pricePerHour"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Price Per Hour (₹) *
                    </label>

                    <input
                        id="pricePerHour"
                        type="number"
                        min="1"
                        step="1"
                        name="pricePerHour"
                        required
                        value={formData.pricePerHour}
                        onChange={handleChange}
                        placeholder="Enter hourly price"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>

        </div>

    );

}

export default PricingSection;