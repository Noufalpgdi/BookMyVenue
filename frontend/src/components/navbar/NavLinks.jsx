import { NavLink } from "react-router-dom";

const links = [
    { name: "Home", path: "/" },
    { name: "Venues", path: "/venues" }
];

function NavLinks() {
    const token = localStorage.getItem("token");

    return (
        <div className="hidden md:flex items-center gap-8">

            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        `font-medium transition pb-1 border-b-2 ${
                            isActive
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent hover:border-blue-600 hover:text-blue-600"
                        }`
                    }
                >
                    {link.name}
                </NavLink>
            ))}

            {token && (
                <NavLink
                    to="/my-bookings"
                    className={({ isActive }) =>
                        `font-medium transition pb-1 border-b-2 ${
                            isActive
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent hover:border-blue-600 hover:text-blue-600"
                        }`
                    }
                >
                    My Bookings
                </NavLink>
            )}

        </div>
    );
}

export default NavLinks;