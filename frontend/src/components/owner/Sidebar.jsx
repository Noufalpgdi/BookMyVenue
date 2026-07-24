import {
    LayoutDashboard,
    Building2,
    CalendarDays,
    Wallet,
    Star,
    Settings,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/owner/dashboard",
    },
    {
        name: "My Venues",
        icon: Building2,
        path: "/owner/venues",
    },
    {
        name: "Bookings",
        icon: CalendarDays,
        path: "/owner/bookings",
    },
    {
        name: "Earnings",
        icon: Wallet,
        path: "/owner/earnings",
    },
    {
        name: "Reviews",
        icon: Star,
        path: "/owner/reviews",
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/owner/settings",
    },
];

function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col">

            {/* Logo */}

            <div className="px-6 py-7 border-b">

                <h1 className="text-2xl font-bold text-blue-600">
                    BookMyVenue
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Venue Owner
                </p>

            </div>

            {/* Menu */}

            <nav className="flex-1 p-4">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >
                            <Icon size={20} />

                            <span className="font-medium">
                                {item.name}
                            </span>

                        </NavLink>
                    );
                })}

            </nav>

            {/* Footer */}

            <div className="border-t p-4">

                <div className="flex items-center gap-3 mb-4">

                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        N
                    </div>

                    <div>

                        <p className="font-medium">
                            Naufal
                        </p>

                        <p className="text-sm text-gray-500">
                            Venue Owner
                        </p>

                    </div>

                </div>

                <button className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors">

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;