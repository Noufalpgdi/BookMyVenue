import {
    LayoutDashboard,
    Clock3,
    Building2,
    CalendarDays,
    Users,
    LogOut
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Pending Venues",
        path: "/admin/pending-approvals",
        icon: Clock3
    },
    {
        name: "Venues",
        path: "/admin/venues",
        icon: Building2
    },
    {
        name: "Bookings",
        path: "/admin/bookings",
        icon: CalendarDays
    },
    {
        name: "Users",
        path: "/admin/users",
        icon: Users
    }
];

function Sidebar() {

    return (

        <aside className="w-64 bg-slate-900 text-white flex flex-col">

            {/* Logo */}

            <div className="px-6 py-6 border-b border-slate-800">

                <h1 className="text-2xl font-bold tracking-wide">

                    BookMyVenue

                </h1>

                <p className="text-sm text-slate-400 mt-1">

                    Admin Panel

                </p>

            </div>

            {/* Navigation */}

            <nav className="flex-1 py-5">

                {

                    menus.map((menu) => {

                        const Icon = menu.icon;

                        return (

                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                className={({ isActive }) =>

                                    `flex items-center gap-3 mx-3 mb-2 px-4 py-3 rounded-lg transition-all duration-200
                                    
                                    ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`

                                }
                            >

                                <Icon size={20} />

                                <span>{menu.name}</span>

                            </NavLink>

                        );

                    })

                }

            </nav>

            {/* Footer */}

            <div className="border-t border-slate-800 p-4">

                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-600 hover:text-white transition"
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;