import { Sparkles } from "lucide-react";

const AVAILABLE_AMENITIES = [
    { value: "PARKING", label: "Parking" },
    { value: "AIR_CONDITIONING", label: "Air Conditioning" },
    { value: "WIFI", label: "WiFi" },
    { value: "POWER_BACKUP", label: "Power Backup" },
    { value: "DINING_AREA", label: "Dining Area" },
    { value: "CATERING", label: "Catering" },
    { value: "STAGE", label: "Stage" },
    { value: "SOUND_SYSTEM", label: "Sound System" },
    { value: "PROJECTOR", label: "Projector" },
    { value: "LIFT", label: "Lift" },
    { value: "RESTROOM", label: "Restroom" },
    { value: "SECURITY", label: "Security" }
];

function AmenitiesSection({ formData, setFormData }) {

    const toggleAmenity = (value) => {

        const exists = formData.amenities.includes(value);

        if (exists) {

            setFormData(prev => ({
                ...prev,
                amenities: prev.amenities.filter(item => item !== value)
            }));

        } else {

            setFormData(prev => ({
                ...prev,
                amenities: [...prev.amenities, value]
            }));

        }

    };

    return (

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}

            <div className="flex items-center gap-3 mb-8">

                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">

                    <Sparkles
                        size={20}
                        className="text-purple-600"
                    />

                </div>

                <div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Amenities
                    </h2>

                    <p className="text-sm text-gray-500">
                        Select the amenities available at your venue.
                    </p>

                </div>

            </div>

            {/* Amenities */}

            <div className="flex flex-wrap gap-3">

                {AVAILABLE_AMENITIES.map(({ value, label }) => {

                    const selected = formData.amenities.includes(value);

                    return (

                        <button
                            key={value}
                            type="button"
                            onClick={() => toggleAmenity(value)}
                            className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium ${
                                selected
                                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                            }`}
                        >
                            {selected && "✓ "}
                            {label}
                        </button>

                    );

                })}

            </div>

            <p className="mt-5 text-sm text-gray-500">

                Selected:&nbsp;

                <span className="font-semibold text-blue-600">
                    {formData.amenities.length}
                </span>

                {" "}
                {formData.amenities.length === 1 ? "amenity" : "amenities"}

            </p>

        </div>

    );

}

export default AmenitiesSection;