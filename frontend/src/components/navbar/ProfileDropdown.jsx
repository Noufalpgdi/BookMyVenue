import { useEffect, useRef, useState } from "react";

import {
    ChevronDown,
    User,
    CalendarCheck,
    LayoutDashboard,
    LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function ProfileDropdown() {

    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
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

    const handleLogout = () => {

        setIsOpen(false);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", { replace: true });

    };

    // If there is no user, don't render anything
    if (!user) return null;

    const userName = user.name || user.fullName || "User";

    const firstLetter = (userName[0] || "U").toUpperCase();

    return (

        <div
            ref={dropdownRef}
            className="relative"
        >

            {/* Profile Button */}

            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-2"
            >

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {firstLetter}
                </div>

                <span className="hidden md:block font-medium">
                    {userName}
                </span>

                <ChevronDown
                    size={18}
                    className={`transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />

            </button>

            {/* Dropdown */}

            {isOpen && (

                <div className="absolute right-0 mt-3 w-56 rounded-xl border bg-white shadow-lg overflow-hidden z-50">

                    {/* User Info */}

                    <div className="px-4 py-3 border-b">

                        <p className="font-semibold">
                            {userName}
                        </p>

                        {user.email && (
                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        )}

                    </div>

                    {/* My Profile */}

                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                    >

                        <User size={18} />

                        <span>My Profile</span>

                    </Link>

                    {/* My Bookings */}

                    <Link
                        to="/my-bookings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                    >

                        <CalendarCheck size={18} />

                        <span>My Bookings</span>

                    </Link>

                    {/* Owner Dashboard */}

                    {user.role === "OWNER" && (

                        <Link
                            to="/owner/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                        >

                            <LayoutDashboard size={18} />

                            <span>Owner Dashboard</span>

                        </Link>

                    )}

                    {/* Admin Dashboard */}

                    {user.role === "ADMIN" && (

                        <Link
                            to="/admin/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
                        >

                            <LayoutDashboard size={18} />

                            <span>Admin Dashboard</span>

                        </Link>

                    )}

                    <div className="border-t" />

                    {/* Logout */}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition"
                    >

                        <LogOut size={18} />

                        <span>Logout</span>

                    </button>

                </div>

            )}

        </div>

    );

}

export default ProfileDropdown;