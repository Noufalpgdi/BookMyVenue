import { Bell, Search, UserCircle, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (

        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

            {/* Left Section */}

            <div>

                <h1 className="text-2xl font-semibold text-gray-800">
                    Admin Dashboard
                </h1>

                <p className="text-sm text-gray-500">
                    Welcome back, Admin
                </p>

            </div>

            {/* Right Section */}

            <div className="flex items-center gap-4">

                {/* Search */}

                <div className="relative hidden md:block">

                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {/* Notifications */}

                <button className="relative p-2 rounded-full hover:bg-gray-100 transition">

                    <Bell size={22} />

                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>

                </button>

                {/* Profile */}

                <div
                    className="relative"
                    ref={dropdownRef}
                >

                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
                    >

                        <UserCircle
                            size={40}
                            className="text-blue-600"
                        />

                        <div className="hidden md:block text-left">

                            <p className="text-sm font-semibold text-gray-800">
                                Admin
                            </p>

                            <p className="text-xs text-gray-500">
                                Administrator
                            </p>

                        </div>

                        <ChevronDown
                            size={18}
                            className={`transition-transform duration-200 ${showDropdown ? "rotate-180" : ""
                                }`}
                        />

                    </button>

                    {showDropdown && (

                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">

                            <button
                                onClick={() => {
                                    navigate("/admin/profile");
                                    setShowDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                            >
                                My Profile
                            </button>

                            <button
                                onClick={() => {
                                    navigate("/change-password");
                                    setShowDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
                            >
                                Change Password
                            </button>

                            <hr />

                            <button
                                onClick={() => {

                                    // Remove authentication data
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");

                                    // Close dropdown
                                    setShowDropdown(false);

                                    // Redirect to login page
                                    navigate("/login", { replace: true });

                                }}
                                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition"
                            >
                                Logout
                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}

export default Navbar;