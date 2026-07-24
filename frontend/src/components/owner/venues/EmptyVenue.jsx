import { Building2, Plus } from "lucide-react";

function EmptyVenue() {
    return (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 py-16 flex flex-col items-center justify-center">

            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

                <Building2
                    size={40}
                    className="text-blue-600"
                />

            </div>

            <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                No Venues Found
            </h2>

            <p className="text-gray-500 mt-2">
                Start by adding your first venue.
            </p>

            <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition">

                <Plus size={18} />

                Add Venue

            </button>

        </div>
    );
}

export default EmptyVenue;