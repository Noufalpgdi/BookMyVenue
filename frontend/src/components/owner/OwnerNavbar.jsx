import {
    Bell,
    Search,
    ChevronDown,
    LogOut,
    User,
    Settings
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

function OwnerNavbar() {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileRef = useRef(null);

    const location = useLocation();

    const storedUser = localStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : {};

    let title = "Dashboard";
    let subtitle = `Welcome back, ${user?.name || ""} 👋`;

    switch (location.pathname) {

        case "/owner/dashboard":
            title = "Dashboard";
            subtitle = `Welcome back, ${user?.name || ""} 👋`;
            break;

        case "/owner/venues":
            title = "My Venues";
            subtitle = "Manage all your venues from one place.";
            break;

        case "/owner/bookings":
            title = "Bookings";
            subtitle = "Manage all your bookings.";
            break;

        case "/owner/earnings":
            title = "Earnings";
            subtitle = "Track your revenue and payouts.";
            break;

        case "/owner/reviews":
            title = "Reviews";
            subtitle = "See what customers are saying.";
            break;

        case "/owner/settings":
            title = "Settings";
            subtitle = "Manage your account settings.";
            break;
        
        case "/owner/venues/new":
            title = "Add Venue";
            subtitle = "Create a new venue listing.";
            break;

        default:
            break;
    }

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {

        setIsProfileOpen(false);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login", { replace: true });

    };


    return (
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 shadow-sm px-8 flex items-center justify-between">

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-gray-800">
                    {title}
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                    {subtitle}
                </p>

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-72 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Notification */}

                <button className="relative p-2 rounded-xl hover:bg-gray-100 transition">

                    <Bell size={22} />

                    <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>

                </button>

                {/* Profile */}

                <div ref={profileRef} className="relative">

                    <button
                        onClick={() => setIsProfileOpen(prev => !prev)}
                        className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
                    >

                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {(user?.name?.[0] || "U").toUpperCase()}
                        </div>

                        <div className="text-left">

                            <p className="font-medium">
                                {user?.name}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user?.role === "OWNER" ? "Venue Owner" : user?.role}
                            </p>

                        </div>

                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${
                                isProfileOpen ? "rotate-180" : ""
                            }`}
                        />

                    </button>

                    {isProfileOpen && (

                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50">

                            {/* User Info */}

                            <div className="px-5 py-4 border-b bg-gray-50">

                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                                        {(user?.name?.[0] || "U").toUpperCase()}
                                    </div>

                                    <div>

                                        <p className="font-semibold">
                                            {user?.name}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {user?.email}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Menu */}

                            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">

                                <User size={18} />

                                <span>My Profile</span>

                            </button>

                            <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">

                                <Settings size={18} />

                                <span>Account Settings</span>

                            </button>

                            <div className="border-t" />

                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition">

                                <LogOut size={18} />

                                <span>Logout</span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
}

export default OwnerNavbar;