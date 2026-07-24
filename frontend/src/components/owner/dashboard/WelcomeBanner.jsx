import { Plus } from "lucide-react";

import { Link } from "react-router-dom";

function WelcomeBanner() {

    const user = JSON.parse(localStorage.getItem("user"));


    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl py-6 px-8 text-white flex items-center justify-between">

            <div>

                <h2 className="text-3xl font-bold">
                    Good Morning, {user?.name} 👋
                </h2>

                <p className="mt-2 text-blue-100">
                    Manage your venues, bookings and earnings from one place.
                </p>

            </div>

            <Link
                to="/owner/venues/new"
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
                <Plus size={18} />
                <span>Add Venue</span>
            </Link>

        </div>
    );
}

export default WelcomeBanner;