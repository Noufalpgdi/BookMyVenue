import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ProfileDropdown from "./ProfileDropdown";
import MobileMenu from "./MobileMenu";

function Navbar() {
    const token = localStorage.getItem("token");

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Logo />

                {/* Navigation Links */}
                <NavLinks />

                {/* Right Section */}
                <div className="flex items-center gap-6">

                    {token ? (
                        <ProfileDropdown />
                    ) : (
                        <div className="hidden md:flex items-center gap-4">

                            <Link
                                to="/login"
                                className="font-medium text-gray-700 hover:text-blue-600 transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>

                        </div>
                    )}

                    <MobileMenu />

                </div>

            </div>
        </header>
    );
}

export default Navbar;