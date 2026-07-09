import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-10 py-5 bg-white shadow">

            <h1 className="text-3xl font-bold text-blue-600">
                BookMyVenue
            </h1>

            <div className="flex gap-8 text-lg">

                <Link to="/">Home</Link>

                <Link to="/venues">Venues</Link>

                <Link to="/login">Login</Link>

            </div>

        </nav>
    );
}

export default Navbar;